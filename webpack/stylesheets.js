const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const path = require("path");

const projectBasePath = path.join(__dirname, "../");

module.exports = {
  mode: "production",
  entry: {
    "swagger-ui": "./src/style/main.scss",
    "swagger-dark-modern-ui": "./src/style/main-dark-modern.scss",
  },

  module: {
    rules: [
      {
        test: [/\.(scss)(\?.*)?$/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                sourceMap: true,
                plugins: [require("cssnano")(), "postcss-preset-env"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: true,
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  devtool: "source-map",

  output: {
    path: path.join(projectBasePath, "dist"),
    publicPath: "/dist",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};
