#!/usr/bin/env node
const { execSync, spawnSync } = require("child_process");

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

// 마지막 태그 조회
let lastTag = "";
try {
  lastTag = execSync("git describe --tags --abbrev=0").toString().trim();
} catch {
  // 태그 없음
}

// 마지막 태그 이후 커밋 메시지 조회
const range = lastTag ? `${lastTag}..HEAD` : "HEAD";
let commits = "";
try {
  commits = execSync(`git log --pretty=%s ${range}`).toString();
} catch {
  // 커밋 없음
}

// 릴리즈 대상 커밋 여부 확인
const hasReleasable = /^(feat|fix|refactor|build|docs|revert):/m.test(commits);

if (hasReleasable) {
  console.log("릴리즈 가능한 커밋이 있습니다. 릴리즈를 진행합니다...");
  const cli = require.resolve("standard-version/bin/cli.js");
  const result = spawnSync("node", [cli], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
} else {
  console.log("릴리즈할 변경사항이 없습니다.");
}

run("git push --follow-tags");
