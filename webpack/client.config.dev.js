const path = require('path');
var webpack = require('webpack');

const root = process.cwd();

module.exports = {
  devtool:'eval',
  debug: true,
  context: path.join(root, "src"),
  entry: ['webpack-hot-middleware/client', './client/index.js'],
  output: {
    path: path.join(root, 'build/client'),
    filename: 'app.js',
    publicPath: '/static'
  },
  resolve: {
    root: path.join(root, "src")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(root, 'src', 'client'),
          path.join(root, 'src', 'shared')
        ],
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: [
            ["transform-decorators-legacy"],
            ["react-transform", {
              transforms: [
                {
                  transform: "react-transform-hmr",
                  imports: ["react"],
                  locals: ["module"]
                },
                {
                  transform: "react-transform-catch-errors",
                  imports: ["react", "redbox-react"]
                }
              ]
            }]
          ]
        }
      }
    ]
  }
}
/*
"presets": ["react", "es2015", "stage-0"],
"plugins": [
  ["transform-decorators-legacy"],
  ["react-transform", {
    "transforms": [{
      "transform": "react-transform-hmr",
      "imports": ["react"],
      "locals": ["module"]
    }, {
      "transform": "react-transform-catch-errors",
      "imports": ["react", "redbox-react"]
    }]
  }]
]
*/
