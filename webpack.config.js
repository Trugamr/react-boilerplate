const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (arg, argv) => {
    const isDevelopment = argv.mode === 'development'
    return  {
        entry: ['./src/indexs.js'],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            camelCase: true,
                            sourceMap: isDevelopment
                        }
                        },
                        {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                        }
                    ]   
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /\.module.(s(a|c)ss)$/,
                    loader: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                           loader: "html-loader"
                        }
                    ]
                },
                
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: 9000,
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
};