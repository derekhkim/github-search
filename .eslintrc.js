module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the default config
    "plugin:react/recommended",
    "google",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
  },
};
