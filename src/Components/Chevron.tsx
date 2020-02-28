import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { bInterpolate, bInterpolateColor } from 'react-native-redash';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Colors from '../Styles/Colors';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const size = 20;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

interface TransitionProps {
    transition: Animated.Node<number>;
}

export default ({ transition }: TransitionProps) => {
    const rotateZ = bInterpolate(transition, 0, Math.PI / 2);
    const tintColor = bInterpolateColor(transition, Colors.white, Colors.black);
    return (
        <Animated.View style={[styles.container, { transform: [{ rotateZ }] }]}>
            <AnimatedIcon name="arrow-right" size={size} color={tintColor} />
        </Animated.View>
    );
};
