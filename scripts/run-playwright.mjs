import {spawn} from "node:child_process";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";
import {preview} from "vite";

/**
 * Runs Playwright against a programmatically managed Vite production preview.
 *
 * Keeping both processes in one Node lifecycle avoids orphaned preview servers
 * on Windows while ensuring Playwright exercises the existing `dist` build.
 *
 * @module scripts/run-playwright
 */

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const previewHost = "127.0.0.1";
const requestedPreviewPort = Number(process.env.PLAYWRIGHT_PORT ?? 0);

const runPlaywrightProcess = (argumentsList, previewPort) => new Promise((resolve, reject) => {
    const playwright = spawn(
        process.execPath,
        [path.join(repositoryRoot, "node_modules", "@playwright", "test", "cli.js"), "test", ...argumentsList],
        {
            cwd: repositoryRoot,
            env: {...process.env, PLAYWRIGHT_PORT: String(previewPort)},
            stdio: "inherit"
        }
    );

    playwright.once("error", reject);
    playwright.once("exit", (code, signal) => resolve(code ?? (signal ? 1 : 0)));
});

/**
 * Starts Vite preview, runs Playwright with forwarded CLI arguments, and closes preview.
 *
 * @param {Array<string>} [argumentsList] - Arguments forwarded to `playwright test`.
 * @returns {Promise<number>} Playwright process exit code.
 */
export const runPlaywright = async (argumentsList = []) => {
    const server = await preview({
        root: repositoryRoot,
        configFile: path.join(repositoryRoot, "vite.config.mjs"),
        logLevel: "warn",
        preview: {
            host: previewHost,
            open: false,
            port: requestedPreviewPort,
            strictPort: requestedPreviewPort !== 0
        }
    });

    try {
        const localUrl = server.resolvedUrls?.local?.[0];

        if (!localUrl) throw new Error("Vite preview did not expose a local URL.");

        return await runPlaywrightProcess(argumentsList, Number(new URL(localUrl).port));
    } finally {
        await server.close();
    }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    runPlaywright(process.argv.slice(2))
        .then((exitCode) => {
            process.exitCode = exitCode;
        })
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });
}
