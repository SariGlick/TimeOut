import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      indent: ["error", "tab"], 
      semi: ["error", "always"], 
      quotes: ["error", "single"], 
      "import/order": ["error", { "alphabetize": { "order": "asc", "caseInsensitive": true } }], 
      "no-unused-vars": "error",
      "no-const-assign": "error", 
      "prefer-const": ["error", {
        "destructuring": "all",
        "ignoreReadBeforeAssign": true
      }], 
      "no-unresolved": "error" 
    }
  }
];
