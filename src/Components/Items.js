import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18n from 'react-native-i18n';

import styles from './../Styles/ItemStyles';
import Colors from '../Styles/Colors';

export default function Item({item}) {
  const {date, time, isToday, isClosed} = item;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.dateText}>{I18n.t(date)}</Text>
        {isToday && <Text style={styles.isTodayText}>{I18n.t('today')}</Text>}
      </View>
      <Text
        style={[
          styles.timeText,
          {color: item.isClosed ? Colors.gray3 : Colors.black},
        ]}>
        {isClosed
          ? I18n.t(time)
          : time &&
            time.length > 0 &&
            time.map((text, key) => [
              key > 0 && ', ',
              <Text key={key}>
                {text.open} - {text.close}
              </Text>,
            ])}
      </Text>
    </View>
  );
}
