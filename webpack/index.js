const nodeExternals = require('webpack-node-externals')();
const path = require('path');
const webpack = require('webpack');
webpack(
  {
    entry: './webpack/multi-compiler.js',
    target: 'node',
    externals: [nodeExternals],
    mode: 'production',
    output: {
      path: path.resolve('.'),
      filename: `webpack.js`,
    },
  },
  (err, stats) => {
    if (err) {
      console.log(err);
    }
  }
);
