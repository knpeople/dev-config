# @knpeople/dev-config

커밋 컨벤션, 체인지로그 설정을 여러 프로젝트에서 공유하기 위한 패키지입니다.

## 포함 내용

- **commitlint** 규칙 공유
- **standard-version** 체인지로그/버전 설정 공유
- **husky** `commit-msg`, `pre-push` 훅 자동 설치

---

## 설치

### npm

```bash
npm install --save-dev github:knpeople/dev-config
```

### yarn

```bash
yarn add -D github:knpeople/dev-config
```

### pnpm

pnpm은 GitHub 패키지의 스크립트 실행을 기본적으로 막습니다. 설치 전에 `package.json`에 아래를 추가해야 합니다.

```json
{
  "pnpm": {
    "onlyBuiltDependencies": ["@knpeople/dev-config"]
  }
}
```

```bash
pnpm add -D github:knpeople/dev-config
```

### 특정 버전으로 설치

```bash
# npm
npm install --save-dev github:knpeople/dev-config#v1.0.0
# yarn
yarn add -D github:knpeople/dev-config#v1.0.0
# pnpm
pnpm add -D github:knpeople/dev-config#v1.0.0
```

설치하면 자동으로 아래가 생성됩니다:

- `.husky/commit-msg` — 커밋 메시지 검사 훅
- `.husky/pre-push` — 직접 `git push` 차단 훅
- `.versionrc.cjs` — 체인지로그 설정
- `package.json`에 아래 스크립트 추가

```json
{
  "scripts": {
    "push": "node node_modules/@knpeople/dev-config/scripts/push.js",
    "release": "node node_modules/@knpeople/dev-config/scripts/release.js"
  }
}
```

### 스크립트 강제 업데이트

`push`, `release` 스크립트가 이미 있어서 자동 설정이 안 됐거나 경로가 잘못된 경우 아래 명령어로 강제로 덮어씁니다.

```bash
node node_modules/@knpeople/dev-config/scripts/update.js
```

---

## 사용법

### 커밋

`git commit` 시 자동으로 컨벤션을 검사합니다.

**허용된 타입:**

| 타입 | 설명 | 버전 |
|---|---|---|
| `feat` | 새로운 기능 추가 / 기존 기능 변경 | minor |
| `add` | 파일/패키지 추가 | patch |
| `fix` | 버그 수정 | patch |
| `refactor` | 코드 리팩토링 | patch |
| `build` | 빌드 설정 변경 | — |
| `docs` | 문서 수정 | — |
| `style` | 코드 포맷 변경 | — |
| `test` | 테스트 추가/수정 | — |
| `chore` | 기타 작업 | — |
| `revert` | 이전 커밋 되돌리기 | — |
| `init` | 초기 설정 | — |

> `—` 타입은 CHANGELOG에는 기록되지 않으며 버전도 올라가지 않습니다.

**형식:** `타입: 내용` (예: `feat: 로그인 기능 추가`)

### 푸쉬

```bash
# npm
npm run push
# yarn
yarn push
# pnpm
pnpm push
```

- 마지막 태그 이후 `feat`, `add`, `fix`, `refactor` 커밋이 있으면 자동으로 릴리즈 후 push
- 릴리즈할 커밋이 없으면 바로 push
- 직접 `git push`는 차단됩니다. 반드시 위 명령어를 사용하세요.

### 체인지로그 생성

```bash
# npm
npm run release
# yarn
yarn release
# pnpm
pnpm release
```

- 커밋 히스토리 기반으로 `CHANGELOG.md` 자동 생성
- `package.json` 버전 자동 bump
- git 태그 자동 생성

**버전 직접 지정:**

```bash
# npm
npm run release -- --release-as patch   # 1.0.0 → 1.0.1
npm run release -- --release-as minor   # 1.0.0 → 1.1.0
npm run release -- --release-as major   # 1.0.0 → 2.0.0
# yarn
yarn release --release-as patch
# pnpm
pnpm release -- --release-as patch
```

**첫 릴리즈:**

```bash
# npm
npm run release -- --first-release
# yarn
yarn release --first-release
# pnpm
pnpm release -- --first-release
```
