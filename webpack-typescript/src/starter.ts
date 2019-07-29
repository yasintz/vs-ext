const path = require('path');
import webpack from 'webpack';
import nodeExternalsModule from 'webpack-node-externals';
const nodeExternals = nodeExternalsModule();
import { ENV_VARIABLES } from './utils';

const externals = [nodeExternals];

webpack(
    {
        entry: path.join(ENV_VARIABLES.EXTENSION_PATH, 'index.ts'),
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
                '@': path.resolve(ENV_VARIABLES.EXTENSION_PATH, 'src/'),
            },
        },
    },
    (err, stats) => {
        console.log(stats.toJson().errors);
    },
);
