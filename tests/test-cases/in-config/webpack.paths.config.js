const path = require("path");
const { merge } = require("webpack-merge");
const defaultConfig = require("./webpack.default.config");
const HtmlRenderPlugin = require("../../../src").default;

const renderDirectory = path.join(process.cwd(), "dist", "render");

const htmlRenderPlugin = new HtmlRenderPlugin({
  mapStatsToParams: () => ({}),
  transformFilePath: ({ route, language, environment }) =>
    `/${environment}/${language}/${route}`,
  routes: [
    { route: "about/us", language: "en-us", environment: "production" },
    {
      route: "about/us",
      language: "en-au",
      environment: "development",
    },
  ],
  renderDirectory,
});

module.exports = [
  merge(defaultConfig[0], {
    plugins: [htmlRenderPlugin.statsCollectorPlugin],
  }),
  merge(defaultConfig[1], {
    plugins: [htmlRenderPlugin.rendererPlugin],
  }),
];
