# @knpeople/dev-config

커밋 컨벤션, 체인지로그 설정을 여러 프로젝트에서 공유하기 위한 패키지입니다.

## 포함 내용

- **commitlint** 규칙 공유
- **standard-version** 체인지로그/버전 설정 공유
- **husky** `commit-msg` 훅 자동 설치

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
- `.versionrc.cjs` — 체인지로그 설정
- `.github/workflows/release.yml` — 자동 버저닝 워크플로우

---

## 사용법

### 커밋

`git commit` 시 자동으로 컨벤션을 검사합니다.

**허용된 타입:**

| 타입 | 설명 | 버전 |
|---|---|---|
| `break` | 하위 호환되지 않는 변경 | major |
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

> `—` 타입은 CHANGELOG에 기록되지 않으며 버전도 올라가지 않습니다.

**형식:** `타입: 내용` (예: `feat: 로그인 기능 추가`)

### 버저닝

`main` 브랜치에 push하면 GitHub Actions가 자동으로 처리합니다.

- 마지막 태그 이후 `break`, `feat`, `add`, `fix`, `refactor` 커밋이 있으면 자동 릴리즈
- `CHANGELOG.md` 업데이트, `package.json` 버전 bump, git 태그 생성 후 push
- 릴리즈할 커밋이 없으면 아무것도 하지 않음

> GitHub Actions가 push할 수 있도록 레포지토리의 `Settings → Actions → General → Workflow permissions`을 **Read and write permissions**으로 설정해야 합니다.
