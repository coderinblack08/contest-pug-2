const path = require("path");

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../stories/**/*.story.@(ts|tsx|js|jsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-postcss",
    // {
    //   name: "@storybook/addon-postcss",
    //   options: {
    //     postcssLoaderOptions: {
    //       implementation: require("postcss"),
    //     },
    //   },
    // },
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        "postcss-loader",
        {
          loader: "postcss-loader",
          options: { implementation: require("postcss") },
        },
      ],
      // include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
