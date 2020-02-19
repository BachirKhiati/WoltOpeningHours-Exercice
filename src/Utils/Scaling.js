import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window'); // get current width
const SCALE_WIDTH = 410; // width range for  iphone 6 / 7 / 8 / Xr....
const SCALE_HEIGHT = 150;

export const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE_WIDTH; // get ratio based on your standard scale
  return Math.round(ratio * SCREEN_WIDTH);
};

export const normalizeHeight = height => {
  const verticalScale = (SCREEN_WIDTH / SCALE_HEIGHT) * height;
  const ratio = height / SCALE_HEIGHT; // get ratio based on scale
  return Math.round(ratio * verticalScale);
};
