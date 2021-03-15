module.exports = {
  stories: ["../src/stories/**/*.story.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        {
          loader: "postcss-loader",
          options: { implementation: require("postcss") },
        },
      ],
    });

    return config;
  },
};
