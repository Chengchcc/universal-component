module.exports = {
     presets: [
        "@vue/app",
        [
            "@babel/preset-typescript",
            {
                isTSX: true,
                allExtensions: true
            }
        ]
    ],
    plugins: ["@babel/plugin-transform-typescript"]
}
