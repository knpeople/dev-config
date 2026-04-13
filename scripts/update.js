#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectRoot = process.env.INIT_CWD || process.cwd();
const pkgPath = path.join(projectRoot, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

pkg.scripts = pkg.scripts || {};
pkg.scripts.push = "node node_modules/@knpeople/dev-config/scripts/push.js";
pkg.scripts.release = "node node_modules/@knpeople/dev-config/scripts/release.js";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("updated: scripts.push, scripts.release in package.json");
