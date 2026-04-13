#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// postinstall 컨텍스트에서는 INIT_CWD가 프로젝트 루트
const projectRoot = process.env.INIT_CWD || process.cwd();
const huskyDir = path.join(projectRoot, ".husky");
const srcDir = path.join(__dirname, "..", "husky");

// husky 초기화 (npm/pnpm/yarn 자동 감지)
const agent = process.env.npm_config_user_agent || "";
const runner = agent.startsWith("pnpm") ? "pnpm exec" : agent.startsWith("yarn") ? "yarn" : "npx";
execSync(`${runner} husky init`, { stdio: "inherit", cwd: projectRoot });

// husky init이 자동 생성하는 pre-commit 제거
const preCommit = path.join(huskyDir, "pre-commit");
if (fs.existsSync(preCommit)) fs.rmSync(preCommit);

// 훅 파일 복사
for (const hook of fs.readdirSync(srcDir)) {
  const dest = path.join(huskyDir, hook);
  fs.copyFileSync(path.join(srcDir, hook), dest);
  fs.chmodSync(dest, 0o755);
  console.log(`copied: .husky/${hook}`);
}

// .versionrc.cjs 생성 (없을 때만, type:module 여부 무관하게 .cjs 사용)
const versionrc = path.join(projectRoot, ".versionrc.cjs");
if (!fs.existsSync(versionrc)) {
  fs.writeFileSync(versionrc, 'module.exports = require("@knpeople/dev-config/versionrc");\n');
  console.log("created: .versionrc.cjs");
}

// package.json 스크립트 수정
const pkgPath = path.join(projectRoot, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
pkg.scripts = pkg.scripts || {};
let pkgChanged = false;

// husky가 자동 추가하는 prepare 스크립트 제거
if (pkg.scripts.prepare === "husky") {
  delete pkg.scripts.prepare;
  console.log("removed: scripts.prepare (husky auto-generated)");
  pkgChanged = true;
}

if (!pkg.scripts.release) {
  pkg.scripts.release = "node node_modules/@knpeople/dev-config/scripts/release.js";
  console.log("added: scripts.release to package.json");
  pkgChanged = true;
}

if (!pkg.scripts.push) {
  pkg.scripts.push = "node node_modules/@knpeople/dev-config/scripts/push.js";
  console.log("added: scripts.push to package.json");
  pkgChanged = true;
}

if (pkgChanged) {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}
