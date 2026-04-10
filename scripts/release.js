#!/usr/bin/env node
const { spawnSync } = require("child_process");

const cli = require.resolve("standard-version/bin/cli.js");
const result = spawnSync("node", [cli, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(result.status ?? 0);
