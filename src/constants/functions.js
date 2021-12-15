import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import preloadFonts from './preloadFonts';
import preloadImages from './preloadImages';

// cache fonts
// /////////////////////////////////////////////////////////////////////////////
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

// cache images
// /////////////////////////////////////////////////////////////////////////////
const cacheImages = (images) =>
  Object.values(images).map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });

// preload async
// /////////////////////////////////////////////////////////////////////////////
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = cacheFonts(preloadFonts);
  const imageAssets = cacheImages(preloadImages);

  // promise load all
  return Promise.all([...fontAssets, ...imageAssets]);
};

// wait/sleep function
// /////////////////////////////////////////////////////////////////////////////
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// bytes to size
// https://gist.github.com/lanqy/5193417#gistcomment-3240729
// /////////////////////////////////////////////////////////////////////////////
const bytesToSize = (bytes, separator = '', postFix = '') => {
  if (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(
      parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10),
      sizes.length - 1
    );

    return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)}${separator}${
      sizes[i]
    }${postFix}`;
  }

  return 'n/a';
};

export default {
  cacheFonts,
  cacheImages,
  loadAssetsAsync,
  wait,
  bytesToSize
};
