const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    webpackFinal: async config => {
        config.watchOptions =  {
            ignored: false
        }
        config.module.rules.push({
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "postcss-loader",  {
              loader: "sass-loader",
              options: {
                  data: '@import "~@/styles/export.scss";'
              }
            }],
            include: path.resolve(__dirname, "../")
        })
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../src/")
        }
        config.resolve.extensions.push(".ts", ".tsx")
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve("babel-loader")
        })
        config.resolve.extensions.push('.jsx')
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            loader: require.resolve("babel-loader")
        })
        return config
    },
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    alias: {
        "@": resolve("../src")
    }
}
