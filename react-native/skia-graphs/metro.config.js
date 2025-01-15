const {getDefaultConfig} = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname, {
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  watchFolders: ['./src'],
});
