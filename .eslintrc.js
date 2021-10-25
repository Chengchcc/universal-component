module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/recommended',
        '@vue/typescript',
        '@vue/prettier',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020
    },
    rules: {
        camelcase: 0,
        "space-before-function-paren": 0,
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 1,
        "vue/attribute-hyphenation": 0,
        "vue/html-closing-bracket-newline": 0,
        "vue/html-closing-bracket-spacing": 0,
        "vue/mustache-interpolation-spacing": 0,
        "vue/max-attributes-per-line": 0,
        "vue/multiline-html-element-content-newline": 0,
        "vue/singleline-html-element-content-newline": 0,
        "vue/require-default-prop": 0,
        "vue/no-v-html": 0,
        "vue/order-in-components": [
            "error",
            {
                order: [
                    "el",
                    "name",
                    "parent",
                    "functional",
                    ["delimiters", "comments"],
                    ["components", "directives", "filters"],
                    "extends",
                    "mixins",
                    "inheritAttrs",
                    "model",
                    ["props", "propsData"],
                    "data",
                    "computed",
                    "watch",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    ["template", "render"],
                    "renderError"
                ]
            }
        ],
        "vue/valid-template-root": 0,
        "@typescript-eslint/type-annotation-spacing": 0,
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/no-this-alias": 0,
        "@typescript-eslint/interface-name-prefix":0,
        "prettier/prettier": 1
    }
}
