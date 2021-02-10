const path = require("path");
const { merge } = require("webpack-merge");
const defaultConfig = require("./webpack.default.config");
const HtmlRenderPlugin = require("../../../src").default;

const renderDirectory = path.join(process.cwd(), "dist", "render");

const htmlRenderPlugin = new HtmlRenderPlugin({
  mapStatsToParams: () => ({}),
  renderDirectory,
  routes: ["", "pageA", "pageB", "error.html"],
});

module.exports = [
  merge(defaultConfig[0], {
    plugins: [htmlRenderPlugin.statsCollectorPlugin],
  }),
  merge(defaultConfig[1], {
    plugins: [htmlRenderPlugin.rendererPlugin],
  }),
];
