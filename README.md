# @knpeople/dev-config

커밋 컨벤션, 체인지로그 설정을 여러 프로젝트에서 공유하기 위한 패키지입니다.

## 포함 내용

- **commitlint** 규칙 공유
- **standard-version** 체인지로그/버전 설정 공유
- **husky** `commit-msg` 훅 자동 설치 스크립트

---

## 설치

```bash
pnpm add -D husky @knpeople/dev-config
```

---

## 설정

### 1. husky 초기화

```bash
node node_modules/@knpeople/dev-config/scripts/init.js
```

이후 `npm install` 시 자동 실행되도록 `prepare` 스크립트를 추가합니다.

### 2. `package.json`

```json
{
  "scripts": {
    "prepare": "node node_modules/@knpeople/dev-config/scripts/init.js",
    "release": "standard-version --config node_modules/@knpeople/dev-config/versionrc.js"
  }
}
```

### 3. `.commitlintrc.json`

```json
{ "extends": ["@knpeople/dev-config/commitlint"] }
```

### 4. `.versionrc.js`

```js
module.exports = require("@knpeople/dev-config/versionrc");
```

---

## 사용법

### 커밋

`git commit` 시 자동으로 컨벤션을 검사합니다.

**허용된 타입:**

| 타입 | 설명 |
|---|---|
| `feat` | 새로운 기능 |
| `add` | 파일/패키지 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 |
| `build` | 빌드 설정 변경 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷 변경 |
| `test` | 테스트 추가/수정 |
| `chore` | 기타 작업 |
| `revert` | 이전 커밋 되돌리기 |
| `init` | 초기 설정 |

**형식:** `타입: 내용` (예: `feat: 로그인 기능 추가`)

### 체인지로그 생성

```bash
pnpm release
```

- 커밋 히스토리 기반으로 `CHANGELOG.md` 자동 생성
- `package.json` 버전 자동 bump
- git 태그 자동 생성

**버전 직접 지정:**

```bash
pnpm release -- --release-as patch   # 1.0.0 → 1.0.1
pnpm release -- --release-as minor   # 1.0.0 → 1.1.0
pnpm release -- --release-as major   # 1.0.0 → 2.0.0
```

**첫 릴리즈:**

```bash
pnpm release -- --first-release
```
