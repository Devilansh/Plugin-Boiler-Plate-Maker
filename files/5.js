const path = require('path');
const PACKAGE = require('./package.json');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new MiniCssExtractPlugin( {
    filename: '[name].css',
} );

module.exports = [
    {
        mode: "production",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname,'build'),
            filename: `${PACKAGE.name}-editor.production.bundle.min.js`
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
        plugins: [
            blocksCSSPlugin,
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // default: {
                    //   reuseExistingChunk: true,
                    // },
                    style: {
                        type: 'css/mini-extract',
                        name: 'style',
                        test: /style\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    editor: {
                        type: 'css/mini-extract',
                        name: 'editor',
                        test: /editor\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    modularCss: {
                        type: 'css/mini-extract',
                        name: 'style.module',
                        test: /style.module\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    }
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader' //see tsconfig.json, we compile to es6 in this
                        }
                    ]
                },
                {
                    test: /style\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        'sass-loader'
                    ],
                },
                {
                    test: /export_to_js\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules:  {
                                    mode: 'icss',
                                }
                            }
                        },
                        'sass-loader'
                    ],
                },
                {
                    test: /editor\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        'sass-loader'
                    ],
                },
                {
                    test: /style.module\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader',
                            options: {
                                modules:  {
                                    mode: 'local',
                                    auto: true,
                                    localIdentName: '[local]__[hash:base64]'
                                },
                                url: false,
                                sourceMap: true
                            }
                        },
                        'sass-loader'
                    ],
                },
            ]
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'lodash': 'lodash',
            'jquery': 'jQuery',
            '@wordpress/data': 'wp.data',
            '@wordpress/components': 'wp.components',
            '@wordpress/i18n': 'wp.i18n',
            '@wordpress/date': 'wp.date',
            '@wordpress/element': 'React',
        }
    },
    {
        mode: "production",
        entry: "./src/frontend.js",
        output: {
            path: path.resolve(__dirname,'build'),
            filename: `${PACKAGE.name}-frontend.production.bundle.min.js`
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
        plugins: [
            blocksCSSPlugin,
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // default: {
                    //   reuseExistingChunk: true,
                    // },
                    style: {
                        type: 'css/mini-extract',
                        name: 'style',
                        test: /style\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    editor: {
                        type: 'css/mini-extract',
                        name: 'editor',
                        test: /editor\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    modularCss: {
                        type: 'css/mini-extract',
                        name: 'style.module',
                        test: /style.module\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    }
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader' //see tsconfig.json, we compile to es6 in this
                        }
                    ]
                },
                {
                    test: /style\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        'sass-loader'
                    ],
                },
                {
                    test: /export_to_js\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules:  {
                                    mode: 'icss',
                                }
                            }
                        },
                        'sass-loader'
                    ],
                },
                {
                    test: /editor\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        'sass-loader'
                    ],
                },
                {
                    test: /style.module\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader',
                            options: {
                                modules:  {
                                    mode: 'local',
                                    auto: true,
                                    localIdentName: '[local]__[hash:base64]'
                                },
                                url: false,
                                sourceMap: true
                            }
                        },
                        'sass-loader'
                    ],
                },
            ]
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'lodash': 'lodash',
            'jquery': 'jQuery',
            '@wordpress/data': 'wp.data',
            '@wordpress/components': 'wp.components',
            '@wordpress/i18n': 'wp.i18n',
            '@wordpress/date': 'wp.date',
            '@wordpress/element': 'React',
        }
    }
];