#!/usr/bin/env node
const { spawnSync } = require("child_process");
const path = require("path");

const cli = require.resolve("@commitlint/cli/cli");
const config = path.resolve(__dirname, "../commitlint.js");
const result = spawnSync("node", [cli, "--config", config, "--edit", process.argv[2]], { stdio: "inherit" });
process.exit(result.status ?? 0);
