import {
    Dimensions, PixelRatio
} from "react-native";

const baseWidth = 375; // iPhone 11 width
const baseHeight = 667; // iPhone 11 height
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const scaleWidth = SCREEN_WIDTH / baseWidth;
const scaleHeight = SCREEN_HEIGHT / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);
const scaleMax = Math.max(scaleWidth, scaleHeight);

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function normalizeMax(size) {
  const newSize = size * scaleMax;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}