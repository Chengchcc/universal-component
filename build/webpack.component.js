const path = require("path")
const Components = require("../components.json")
const config = require("./config")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "production",
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), "./lib"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[id].js",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: config.alias,
        modules: ["node_modules"]
    },
    externals: config.externals,
    performance: {
        hints: false
    },
    stats: "none",
    optimization: {
        minimize: false
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            {
                test: /\.(jsx?)$/,
                include: process.cwd(),
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            happyPackMode: false,
                            appendTsxSuffixTo: ["\\.vue$"]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        compilerOptions: {
                            whitespace: "condense"
                        }
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            data: '@import "~@/styles/export.scss";'
                        }
                    }
                ],
                include: path.resolve(__dirname, "../")
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: path.posix.join("static", "[name].[hash:7].[ext]")
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin(), new MiniCssExtractPlugin()]
}
