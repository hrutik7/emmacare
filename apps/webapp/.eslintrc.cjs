/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "no-unused-vars": "off",
    "prefer-const": "off",
    // 'no-unused-vars': ['error', { 'varsIgnorePattern': '^((?!mindLength).)*$' }],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-unnecessary-type-assertions": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    '@typescript-eslint/no-unsafe-assignment': 'off',
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-floating-promises": "off",
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    // '@typescript-eslint/no-empty-interface': 'off',
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;
