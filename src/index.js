import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import { getInput, info, setFailed, setOutput } from "@actions/core";

import * as options from "./options.js";

const require = createRequire(import.meta.url);
const { Handlers } = require("github-readme-activity-graph/src/handlers");

async function run() {
    const handler = new Handlers();

    const optionsInput = getInput("options");
    const usernameInput = getInput("username", { required: true });
    const outputPathInput = getInput("output_path");
    const queryOptions = options.parse(optionsInput);

    const query = { ...queryOptions, username: usernameInput };

    const outputPathValue = outputPathInput || path.join("dist", "activity-graph.svg");
    const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
    const outputPath = path.resolve(workspace, outputPathValue);

    await mkdir(path.dirname(outputPath), { recursive: true });

    let svg = "";
    const res = {
        set() { return this; },
        setHeader() { return this; },
        status() { return this; },
        send(value) {
            svg = value;
            return this;
        },
    };

    await handler.getGraph({ query }, res);

    if (!svg || svg.includes("Something unexpected happened")) {
        throw new Error("Upstream returned an empty or error SVG.");
    }

    await writeFile(outputPath, svg, "utf8");

    info(`wrote "${outputPath}" successfully`);
    setOutput("path", outputPathValue);
}

run().catch((error) => {
    setFailed(error instanceof Error ? error.message : String(error));
});
