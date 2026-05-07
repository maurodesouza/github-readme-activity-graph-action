import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { beforeAll, expect, test } from "vitest";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const previewDir = path.resolve(rootDir, "tests/__output__");
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "maurodesouza";

function runCard(output) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, ["--import", "tsx", path.join(rootDir, "src/index.js")], {
            stdio: "inherit",
            env: {
                ...process.env,
                INPUT_OPTIONS: "theme=vue&custom_title=This%20is%20a%20title",
                INPUT_USERNAME: repoOwner,
                INPUT_OUTPUT_PATH: output,
            },
        });

        child.on("error", reject);
        child.on("exit", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`card failed with code ${code}`));
        });
    });
}

beforeAll(async () => {
    await mkdir(previewDir, { recursive: true });
});

test("Should generate a card locally", async () => {
    const outputPath = path.join(previewDir, "activity-graph.svg");
    await runCard(outputPath);

    const svg = await readFile(outputPath, "utf8");

    expect(svg).toMatch(/^\s*<svg[\s>][^]*<\/svg>\s*$/);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg.length).toBeGreaterThan(1000);
    expect(svg).not.toContain("Something unexpected happened");
    expect(svg).toMatch(/<path\b/);
});
