const { createInMemoryFileSystem } = require("../../utils/memory-fs");
const webpack = require("webpack");

const config = require("./webpack.config");

function getCurrentMemoryUsageInMB() {
  return Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
}

describe("Render multiple times without increasing heap memory", () => {
  it("should not leak memory when memoizing webpackStats", async (done) => {
    jest.setTimeout(20 * 1000);
    const compiler = webpack(config);
    const initialMemoryUsage = getCurrentMemoryUsageInMB();

    const memoryFs = createInMemoryFileSystem();
    compiler.outputFileSystem = memoryFs;

    compiler.run((error, stats) => {
      if (error) {
        throw error;
      }
      expect(stats.hasErrors()).toBe(false);
      const afterMemoryUsage = getCurrentMemoryUsageInMB();
      expect(afterMemoryUsage - initialMemoryUsage).toBeLessThan(150);
      done();
    });
  });
});
