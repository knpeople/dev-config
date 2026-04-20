module.exports = {
  header: "# Changelog",
  releaseCommitMessageFormat: "chore: release {{currentTag}}",
  types: [
    { type: "feat", section: "🆕 Added" },
    { type: "add", section: "🆕 Added", release: "patch" },
    { type: "fix", section: "🐛 Fixed" },
    { type: "refactor", section: "⚡ Improved", release: "patch" },
    { type: "build", section: "⚡ Improved" },
    { type: "docs", section: "📚 Docs" },
    { type: "revert", section: "🗑️ Deprecated / Removed" },
    { type: "init", hidden: true },
    { type: "chore", hidden: true },
    { type: "style", section: "💄 Style" },
    { type: "test", hidden: true },
  ],
  writerOpts: {
    headerPartial: "## 🚀 v{{version}} ({{date}})\n\n",
    commitPartial: "- {{subject}} [@{{shortHash}}]\n",
  },
};
