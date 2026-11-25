const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      // Evita que ESLint falle si un endpoint tiene (req, res) y solo se usa res
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];