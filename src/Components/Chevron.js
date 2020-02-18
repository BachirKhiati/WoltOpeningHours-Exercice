import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {bInterpolate, bInterpolateColor} from 'react-native-redash';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

import Colors from '../Styles/Colors';

const size = 20;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({transition}) => {
  const rotateZ = bInterpolate(transition, 0, Math.PI / 2);
  const tintColor = bInterpolateColor(transition, Colors.white, Colors.black);
  return (
    <Animated.View style={[styles.container, {transform: [{rotateZ}]}]}>
      <AnimatedIcon name={'arrow-right'} size={size} color={tintColor} />
    </Animated.View>
  );
};
