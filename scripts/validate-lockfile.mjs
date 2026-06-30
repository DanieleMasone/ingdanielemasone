import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const lockfilePath = path.join(rootDir, "package-lock.json");
const publicRegistryPrefix = "https://registry.npmjs.org/";

/**
 * Validates the committed npm lockfile before CI performs a frozen install.
 * The checks catch root-manifest drift, private registry leaks and any
 * dependency reference whose package node is absent from the portable lockfile.
 */
const forbiddenResolvedPatterns = [
    /^file:/i,
    /^[A-Za-z]:[\\/]/,
    /(?:artifactory|nexus|verdaccio|localhost|127\.0\.0\.1)/i
];

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (message) => {
    throw new Error(message);
};

if (!fs.existsSync(packageJsonPath)) fail("package.json is missing.");
if (!fs.existsSync(lockfilePath)) fail("package-lock.json is missing.");

const packageJson = readJson(packageJsonPath);
const lockfile = readJson(lockfilePath);
const packages = lockfile.packages ?? {};
const rootPackage = packages[""];

if (lockfile.lockfileVersion !== 3) {
    fail(`Expected package-lock lockfileVersion 3, found ${lockfile.lockfileVersion}.`);
}

if (!rootPackage) fail("package-lock.json is missing the root package entry.");

const rootSections = ["dependencies", "devDependencies", "optionalDependencies"];

for (const section of rootSections) {
    const expected = packageJson[section] ?? {};
    const actual = rootPackage[section] ?? {};

    for (const [name, versionRange] of Object.entries(expected)) {
        if (actual[name] !== versionRange) {
            fail(`Root ${section}.${name} is ${actual[name] ?? "<missing>"} in package-lock, expected ${versionRange}.`);
        }
    }

    for (const name of Object.keys(actual)) {
        if (!(name in expected)) {
            fail(`package-lock root contains unexpected ${section}.${name}.`);
        }
    }
}

for (const [nodePath, metadata] of Object.entries(packages)) {
    const resolved = metadata.resolved;

    if (typeof resolved === "string") {
        if (forbiddenResolvedPatterns.some((pattern) => pattern.test(resolved))) {
            fail(`Forbidden local/private resolved URL in ${nodePath}: ${resolved}`);
        }

        if (resolved.startsWith("http") && !resolved.startsWith(publicRegistryPrefix)) {
            fail(`Unexpected registry URL in ${nodePath}: ${resolved}`);
        }
    }

    for (const dependencySection of ["dependencies", "optionalDependencies"]) {
        const dependencies = metadata[dependencySection] ?? {};

        for (const dependencyName of Object.keys(dependencies)) {
            const dependencyNode = path.posix.join(nodePath, "node_modules", dependencyName).replaceAll("\\", "/");
            const hoistedNode = `node_modules/${dependencyName}`;

            if (!packages[dependencyNode] && !packages[hoistedNode]) {
                fail(`${nodePath || "<root>"} references missing ${dependencySection}.${dependencyName}.`);
            }
        }
    }
}

console.log("package-lock.json structural validation passed.");
