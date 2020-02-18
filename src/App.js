import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  Image,
} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {
  bInterpolate,
  bInterpolateColor,
  useTransition,
} from 'react-native-redash';

import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import I18n from 'react-native-i18n';


import Chevron from './Components/Chevron';
import Colors from './Styles/Colors';
import styles from './Styles/AppStyles';
import {Convert} from './Utils/Conversion';
import Item from './Components/Items';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const MIN_WIDTH = WIDTH * 0.6;
const MAX_WIDTH = WIDTH * 0.8;
const TOP_INT = 2 / WIDTH;
const BTN_HEIGHT = 60;
const LIST_HEIGHT = WIDTH - BTN_HEIGHT;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function App() {
  const [showHours, setShowHours] = useState(false);
  const [list, setList] = useState([]);

  const mainTransition = useTransition(showHours);

  const heightContainerInterpolate = bInterpolate(mainTransition, BTN_HEIGHT, WIDTH);
  const heightListInterPolate = bInterpolate(mainTransition, 0, LIST_HEIGHT);
  const heightListOpacity = bInterpolate(mainTransition, 0, 1);
  const widthInterpolate = bInterpolate(mainTransition, MIN_WIDTH, MAX_WIDTH);
  const topInterpolate = interpolate(mainTransition, {inputRange: [0, TOP_INT], outputRange: [1, 0]});
  const backgroundInterpolate = bInterpolateColor(mainTransition, Colors.green, Colors.white);
  const textColorInterpolate = bInterpolateColor(mainTransition, Colors.white, Colors.black);

  useEffect(() => {
    setList(Convert());
  }, []);

  function onPressShow() {
    setShowHours(!showHours);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <Animated.View style={{top: topInterpolate}}>
        <TouchableHighlight style={styles.btnWrapper} onPress={onPressShow}>
          <Animated.View
            style={[
              styles.animationContainer,
              {
                height: heightContainerInterpolate,
                width: widthInterpolate,
                backgroundColor: backgroundInterpolate,
              },
            ]}>
            <View style={styles.visibleView}>
              <AnimatedIcon
                name={'clock'}
                color={textColorInterpolate}
                size={20}
              />
              <Animated.Text
                style={[
                  styles.visibleViewText,
                  {
                    color: textColorInterpolate,
                  },
                ]}>
                {I18n.t('opening_hours')}
              </Animated.Text>
              <Chevron transition={mainTransition} />
            </View>
            <Animated.View
              style={[
                styles.minimizedView,
                {
                  height: heightListInterPolate,
                  opacity: heightListOpacity,
                },
              ]}>
              {list.map((item, key) => (
                <Item {...{item, key}} />
              ))}
            </Animated.View>
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}
export default App;
