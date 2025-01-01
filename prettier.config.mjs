/** @type {import("prettier").Config} */
const config = {
    semi: true,
    trailingComma: "none",
    tabWidth: 4,
    bracketSpacing: true,
    singleQuote: false,
    arrowParens: "always",
    quoteProps: "consistent",
    printWidth: 120,
    plugins: ["prettier-plugin-tailwindcss", "@ianvs/prettier-plugin-sort-imports"],
    importOrder: [
        "",
        "^react$",
        "^next(-[^/]+)?(/.*)?$",
        "",
        "<TYPES>",
        "<TYPES>^[.]",
        "",
        "<BUILTIN_MODULES>",
        "",
        "<THIRD_PARTY_MODULES>",
        "",
        "^#/(.*)$",
        "",
        "^[./]",
        "",
        "^(?!.*[.]css$)[./].*$",
        ".css$"
    ],
    importOrderTypeScriptVersion: "5.4.5",
    overrides: [
        {
            files: ["**/.vscode/*.json", "**/tsconfig.json", "**/tsconfig.*.json"],
            options: {
                parser: "jsonc"
            }
        }
    ]
};

export default config;
