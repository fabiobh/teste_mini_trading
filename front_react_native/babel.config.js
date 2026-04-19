module.exports = function(api) {
  api.cache(false); // Disable cache to be safe
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
