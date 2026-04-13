# @knpeople/dev-config

커밋 컨벤션, 체인지로그 설정을 여러 프로젝트에서 공유하기 위한 패키지입니다.

## 포함 내용

- **commitlint** 규칙 공유
- **standard-version** 체인지로그/버전 설정 공유
- **husky** `commit-msg` 훅 자동 설치

---

## 설치

### 1. `package.json`에 allowlist 추가

pnpm은 GitHub 패키지의 스크립트 실행을 기본적으로 막습니다. 설치 전에 아래를 먼저 추가해야 합니다.

```json
{
  "pnpm": {
    "onlyBuiltDependencies": ["@knpeople/dev-config"]
  }
}
```

### 2. 설치

```bash
pnpm add -D github:knpeople/dev-config
```

특정 버전으로 설치:

```bash
pnpm add -D github:knpeople/dev-config#v1.0.0
```

설치하면 자동으로 아래 파일들이 생성됩니다:

- `.husky/commit-msg` — 커밋 메시지 검사 훅
- `.commitlintrc.json` — commitlint 설정
- `.versionrc.cjs` — 체인지로그 설정
- `package.json`의 `release`, `push` 스크립트

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

### 푸쉬

```bash
pnpm push
```

- 마지막 태그 이후 `feat`, `fix`, `refactor`, `build`, `docs`, `revert` 커밋이 있으면 자동으로 릴리즈 후 push
- 릴리즈할 커밋이 없으면 바로 push

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
