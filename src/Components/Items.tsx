import React from 'react';
import { Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import styles from '../Styles/ItemStyles';
import Colors from '../Styles/Colors';
import { NewDatesObjectType } from '../Utils/Conversion';

interface ItemsProps {
    item: NewDatesObjectType;
}

export default function Item({ item }: ItemsProps) {
    const { date, time, isToday, isClosed } = item;
    return (
        <View style={styles.container}>
            <View style={styles.dateTextView}>
                <Text style={styles.dateText}>{I18n.t(date)}</Text>
                {isToday && (
                    <Text style={styles.isTodayText}>{I18n.t('today')}</Text>
                )}
            </View>
            <View style={styles.timeTextWrapper}>
                {isClosed || !Array.isArray(time) ? (
                    <Text
                        style={[
                            styles.timeText,
                            { color: isClosed ? Colors.gray3 : Colors.black }
                        ]}
                    >
                        {I18n.t('closed')}
                    </Text>
                ) : (
                    Array.isArray(time) &&
                    time.map(({ open, close }, key) => (
                        <View style={styles.timeTextView} key={`Items${key}`}>
                            <Text>
                                {open.hour} {open.period}
                            </Text>
                            <Text>{' - '}</Text>
                            <Text>
                                {close.hour} {close.period}
                            </Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}
