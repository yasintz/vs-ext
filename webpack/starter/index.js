const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')();

const externals = [nodeExternals];

webpack(
    {
        entry: path.join(EXTENSION_PATH, 'index.ts'),
        mode: 'production',
        target: 'node',
        output: {
            path: path.resolve('.'),
            filename: 'starter.js',
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        externals,
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(EXTENSION_PATH, 'src/'),
            },
        },
    },
    (err, stats) => {
        console.log(stats.toJson().errors);
    },
);
module.exports = config;
