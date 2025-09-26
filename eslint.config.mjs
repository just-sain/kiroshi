import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
	js.configs.recommended,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		ignores: ["node_modules", ".next"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				// browser: false 
				// // если нужен browser, поставить true
				window: "readonly",
				document: "readonly",
			},
		},
		plugins: {
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
			"jsx-a11y": jsxA11yPlugin,
			prettier: prettierPlugin,
			import: importPlugin,
			"unused-imports": unusedImportsPlugin,
			"@typescript-eslint": tseslint.plugin,
		},
		settings: {
			react: { version: "detect" },
		},
		rules: {
			"no-console": "warn",
			"react/prop-types": "off",
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
			"react-hooks/exhaustive-deps": "off",
			"jsx-a11y/click-events-have-key-events": "warn",
			"jsx-a11y/interactive-supports-focus": "warn",
			"prettier/prettier": "warn",

			"no-unused-vars": "off",
			"unused-imports/no-unused-vars": "off",
			"unused-imports/no-unused-imports": "warn",

			"object-curly-spacing": ["error", "never"],


			"@typescript-eslint/no-unused-vars": [
				"warn", 
				{
					args: "after-used",
					ignoreRestSiblings: false,
					argsIgnorePattern: "^_.*?$",
				},
			],

			"import/order": [
				"warn",
				{
					groups: [
						"type",
						"builtin",
						"object",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					pathGroups: [
						{
							pattern: "~/**",
							group: "external",
							position: "after",
						},
					],
					"newlines-between": "always",
				},
			],

			"react/self-closing-comp": "warn",

			"react/jsx-sort-props": [
				"warn",
				{
					callbacksLast: true,
					shorthandFirst: true,
					noSortAlphabetically: false,
					reservedFirst: true,
				},
			],

			"padding-line-between-statements": [
				"warn",
				{ blankLine: "always", prev: "*", next: "return" },
				{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
				{
					blankLine: "any",
					prev: ["const", "let", "var"],
					next: ["const", "let", "var"],
				},
			],
		},
	}
);

