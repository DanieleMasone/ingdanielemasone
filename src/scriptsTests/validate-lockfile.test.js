import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {execFileSync, spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {describe, expect, test} from "vitest";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const scriptPath = path.join(rootDir, "scripts", "validate-lockfile.mjs");

describe("validate-lockfile script", () => {
    test("accepts the repository lockfile", () => {
        const output = execFileSync(process.execPath, [scriptPath], {
            cwd: rootDir,
            encoding: "utf8"
        });

        expect(output).toContain("package-lock.json structural validation passed");
    });

    test("rejects missing dependency package nodes", () => {
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "lockfile-validation-"));

        try {
            fs.writeFileSync(
                path.join(tempDir, "package.json"),
                JSON.stringify({
                    name: "broken-lockfile",
                    dependencies: {
                        leftpad: "1.0.0"
                    }
                })
            );

            fs.writeFileSync(
                path.join(tempDir, "package-lock.json"),
                JSON.stringify({
                    name: "broken-lockfile",
                    lockfileVersion: 3,
                    packages: {
                        "": {
                            dependencies: {
                                leftpad: "1.0.0"
                            }
                        },
                        "node_modules/leftpad": {
                            version: "1.0.0"
                        },
                        "node_modules/parent": {
                            dependencies: {
                                missing: "1.0.0"
                            }
                        }
                    }
                })
            );

            const result = spawnSync(process.execPath, [scriptPath], {
                cwd: tempDir,
                encoding: "utf8"
            });

            expect(result.status).not.toBe(0);
            expect(result.stderr).toMatch(/references missing dependencies\.missing/);
        } finally {
            fs.rmSync(tempDir, {force: true, recursive: true});
        }
    });

    test("rejects missing optional dependency package nodes without package-specific rules", () => {
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "lockfile-validation-"));

        try {
            fs.writeFileSync(
                path.join(tempDir, "package.json"),
                JSON.stringify({name: "portable-lockfile"})
            );
            fs.writeFileSync(
                path.join(tempDir, "package-lock.json"),
                JSON.stringify({
                    name: "portable-lockfile",
                    lockfileVersion: 3,
                    packages: {
                        "": {},
                        "node_modules/platform-parent": {
                            optionalDependencies: {
                                "platform-binding": "1.0.0"
                            }
                        }
                    }
                })
            );

            const result = spawnSync(process.execPath, [scriptPath], {
                cwd: tempDir,
                encoding: "utf8"
            });

            expect(result.status).not.toBe(0);
            expect(result.stderr).toMatch(/references missing optionalDependencies\.platform-binding/);
        } finally {
            fs.rmSync(tempDir, {force: true, recursive: true});
        }
    });
});
