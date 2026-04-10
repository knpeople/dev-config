#!/usr/bin/env node
const { spawnSync } = require("child_process");

const cli = require.resolve("@commitlint/cli/cli");
const result = spawnSync("node", [cli, "--edit", process.argv[2]], { stdio: "inherit" });
process.exit(result.status ?? 0);
