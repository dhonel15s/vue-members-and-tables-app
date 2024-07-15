const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/dist",
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },

      // or
      overlay: false,
    },
  },
});
