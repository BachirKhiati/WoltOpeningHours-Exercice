import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18n from 'react-native-i18n';

import styles from './../Styles/ItemStyles';
import Colors from '../Styles/Colors';

export default function Item({item}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.dateText}>{I18n.t(item.date)}</Text>
        {item.isToday && <Text style={styles.isTodayText}>{I18n.t('today')}</Text>}
      </View>
      <Text
        style={[
          styles.timeText,
          {color: item.isClosed ? Colors.gray3 : Colors.black},
        ]}>
        {!item.isClosed ? item.time : I18n.t(item.time)}
      </Text>
    </View>
  );
}
