module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-case": [0],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-empty": [2, "always"],
    "type-enum": [
      2,
      "always",
      [
        "init",
        "feat",
        "add",
        "chore",
        "style",
        "fix",
        "test",
        "build",
        "refactor",
        "docs",
        "revert",
      ],
    ],
  },
};
