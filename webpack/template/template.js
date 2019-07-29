const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
import { exec } from 'child_process';
import { inlineHtmlScripts } from '../utils';

const config = ({ mode, TEMPLATE_PATH, BUNDLE_PATH }) => {
    const DIST_FOLDER = path.resolve(TEMPLATE_PATH, 'dist');
    return {
        run: () =>
            new Promise((resolve, reject) => {
                webpack(
                    {
                        entry: path.join(TEMPLATE_PATH, 'index.js'),
                        mode,
                        target: 'web',
                        output: {
                            path: DIST_FOLDER,
                            filename: `index.js`,
                        },
                        module: {
                            rules: [
                                {
                                    test: /.(js|jsx)$/,
                                    use: {
                                        loader: 'babel-loader',
                                        options: {
                                            presets: ['@babel/preset-env', '@babel/preset-react'],
                                            plugins: ['@babel/plugin-proposal-class-properties', 'styled-jsx/babel'],
                                        },
                                    },
                                },
                                {
                                    test: /\.less$/,
                                    use: ['style-loader', 'css-loader', 'less-loader'],
                                },
                            ],
                        },
                        plugins: [
                            new HtmlWebpackPlugin({
                                filename: 'index.html',
                                template: path.resolve(TEMPLATE_PATH, 'index.html'),
                            }),
                            new webpack.DefinePlugin({
                                'process.env': {
                                    NODE_ENV: JSON.stringify(mode),
                                },
                            }),
                        ],
                        resolve: {
                            extensions: ['.js', 'jsx'],
                            alias: {
                                '@': TEMPLATE_PATH,
                            },
                        },
                    },
                    (err, stats) => {
                        const hasError = stats.toJson().errors.length > 0;
                        if (hasError) {
                            console.log(stats.toJson().errors);
                            reject(stats.toJson().errors);
                        } else {
                            const singleHtmlFile = inlineHtmlScripts(path.join(DIST_FOLDER, 'index.html'));

                            fs.writeFileSync(path.join(BUNDLE_PATH, 'index.html'), singleHtmlFile);

                            exec(`rm -rf ${DIST_FOLDER}`, (err, stdout, stderr) => {});
                            resolve(stats);
                        }
                    },
                );
            }),
    };
};
export default config;
