import React from 'react';
import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width; // get current width
const SCALE = 410; // width close of  iphone 6 / 7 / 8

export const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE; // get ratio based on your standard scale
  return Math.round(ratio * SCREEN_WIDTH);
};
