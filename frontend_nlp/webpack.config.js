/* eslint-disable no-undef */

const devCerts = require("office-addin-dev-certs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const urlDev = "https://localhost:3000/";
const urlProd = "https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    devtool: "source-map",
    entry: {
      polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
      taskpane: ["./src/taskpane/taskpane.js", "./src/taskpane/taskpane.html"],
      summarise: ["./src/summarise/summarise.js", "./src/summarise/summarise.html"],
      analyse: ["./src/analyse/analyse.js", "./src/analyse/analyse.html"],
      search: ["./src/search/search.js", "./src/search/search.html"],
      citations: ["./src/citations/citations.js", "./src/citations/citations.html"],
      detectChanges: ["./src/detectChanges/detectChanges.js", "./src/detectChanges/detectChanges.html"],
      docPref: ["./src/docPref/docPref.js", "./src/docPref/docPref.html"],
      refresh: ["./src/refresh/refresh.js", "./src/refresh/refresh.html"],
      unlinkCitations: ["./src/unlinkCitations/unlinkCitations.js", "./src/unlinkCitations/unlinkCitations.html"],
      commands: "./src/commands/commands.js",
    },
    output: {
      clean: true,
    },
    resolve: {
      extensions: [".html", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane/taskpane.html",
        chunks: ["polyfill", "taskpane"],
      }),
      new HtmlWebpackPlugin({
        filename: "summarise.html",
        template: "./src/summarise/summarise.html",
        chunks: ["polyfill", "summarise"],
      }),
      new HtmlWebpackPlugin({
        filename: "analyse.html",
        template: "./src/analyse/analyse.html",
        chunks: ["polyfill", "analyse"],
      }),
      new HtmlWebpackPlugin({
        filename: "search.html",
        template: "./src/search/search.html",
        chunks: ["polyfill", "search"],
      }),
      new HtmlWebpackPlugin({
        filename: "citations.html",
        template: "./src/citations/citations.html",
        chunks: ["polyfill", "citations"],
      }),
      new HtmlWebpackPlugin({
        filename: "detectChanges.html",
        template: "./src/detectChanges/detectChanges.html",
        chunks: ["polyfill", "detectChanges"],
      }),
      new HtmlWebpackPlugin({
        filename: "docPref.html",
        template: "./src/docPref/docPref.html",
        chunks: ["polyfill", "docPref"],
      }),
      new HtmlWebpackPlugin({
        filename: "refresh.html",
        template: "./src/refresh/refresh.html",
        chunks: ["polyfill", "refresh"],
      }),
      new HtmlWebpackPlugin({
        filename: "unlinkCitations.html",
        template: "./src/unlinkCitations/unlinkCitations.html",
        chunks: ["polyfill", "unlinkCitations"],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "assets/*",
            to: "assets/[name][ext][query]",
          },
          {
            from: "manifest*.xml",
            to: "[name]" + "[ext]",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
              }
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        filename: "commands.html",
        template: "./src/commands/commands.html",
        chunks: ["polyfill", "commands"],
      }),
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      server: {
        type: "https",
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      },
      port: process.env.npm_package_config_dev_server_port || 3000,
    },
  };

  return config;
};
