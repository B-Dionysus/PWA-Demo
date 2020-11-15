const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  mode: "development",

  entry: {
    index:"./scripts/index.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      inject: false,
      name: "Budget App",
      short_name: "Budge",
      description: "App your Budgets!!",
      background_color: "#01579b",
      theme_color: "#ffffff",
      start_url: "/",
      icons: [
        {
            src: path.resolve('icons/icon-192x192.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('', 'icons'),
          },        
        {
        src: path.resolve('icons/icon-512x512.png'),
        sizes: [512],
        destination: path.join('', 'icons'),
        },
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
module.exports = config;