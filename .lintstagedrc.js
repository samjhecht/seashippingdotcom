module.exports = {
  // Run ESLint on TypeScript and JavaScript files
  "**/*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write",
  ],

  // Run Prettier on JSON, Markdown, and YAML files
  "**/*.{json,md,yml,yaml}": [
    "prettier --write",
  ],

  // Type-check TypeScript files
  "**/*.{ts,tsx}": [
    () => "tsc --noEmit",
  ],

  // Run tests related to changed files (if applicable)
  // This is commented out to keep pre-commit fast
  // "**/*.{ts,tsx}": [
  //   () => "npm run test -- --related --run",
  // ],
};
