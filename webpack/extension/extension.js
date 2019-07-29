const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')({
  // whitelist: [/^lowdb/, /^node-fetch/, /^lodash/],
});

const externals = [nodeExternals];

const config = ({ mode, EXTENSION_PATH, BUNDLE_PATH }) => {
  const isProduction = mode === 'production';
  const developmentField = isProduction
    ? {}
    : {
        devtool: 'source-map',
      };

  return {
    run: () =>
      new Promise((resolve, reject) => {
        webpack(
          {
            entry: path.join(EXTENSION_PATH, 'src', 'extension.ts'),
            mode,
            ...developmentField,
            target: 'node',
            output: {
              path: BUNDLE_PATH,
              filename: `extension.js`,
              libraryTarget: 'commonjs2',
              devtoolModuleFilenameTemplate: '../[resource-path]',
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
            externals: isProduction
              ? {
                  vscode: 'vscode',
                }
              : externals,
            resolve: {
              extensions: ['.ts', '.js'],
              alias: {
                '@': path.resolve(EXTENSION_PATH, 'src/'),
              },
            },
          },
          (err, stats) => {
            if (err) {
              console.log(error);
              reject(err);
            } else {
              resolve(stats);
            }
          }
        );
      }),
  };
};
module.exports = config;
