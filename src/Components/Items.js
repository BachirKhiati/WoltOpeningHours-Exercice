import React from 'react';
import {Text, View} from 'react-native';
import I18n from 'react-native-i18n';

import styles from './../Styles/ItemStyles';
import Colors from '../Styles/Colors';

export default function Item({item}) {
  const {date, time, isToday, isClosed} = item;
  return (
    <View style={styles.container}>
      <View style={styles.dateTextView}>
        <Text style={styles.dateText}>{I18n.t(date)}</Text>
        {isToday && <Text style={styles.isTodayText}>{I18n.t('today')}</Text>}
      </View>
      <View style={styles.timeTextWrapper}>
        {isClosed ? (
          <Text
            style={[
              styles.timeText,
              {color: isClosed ? Colors.gray3 : Colors.black},
            ]}>
            {I18n.t(time)}
          </Text>
        ) : (
          time &&
          time.length > 0 &&
          time.map((text, key) => (
            <View style={styles.timeTextView} key={key}>
              <Text>
                {text.open.hour} {text.open.convention}
              </Text>
              <Text>{' - '}</Text>
              <Text>
                {text.close.hour} {text.close.convention}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
