import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      'semi': ['error', 'always'],
      'indent': ['error', 2], // enforce 2 spaces for indentation
      'react/prop-types': ['error'], // prevent missing propTypes
      'import/order': ['error', { 'newlines-between': 'always' }], // prevent unordered imports
      'no-unused-vars': ['error'], // prevent unused variables
      'react/jsx-no-duplicate-props': ['error'], // prevent duplicated props
      'no-const-assign': ['error'], // prevent assigning value to const variable
      'no-var': ['error'], // prevent using var
      'prefer-const': ['error'] // suggest using const
    }
  }
];