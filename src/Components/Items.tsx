import React from 'react';
import { Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import styles from '../Styles/ItemStyles';
import Colors from '../Styles/Colors';
import { NewDatesObjectType, EachDayEntryType } from '../Utils/Conversion';

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
                {isClosed ? (
                    <Text
                        style={[
                            styles.timeText,
                            { color: isClosed ? Colors.gray3 : Colors.black }
                        ]}
                    >
                        {I18n.t(time as string)}
                    </Text>
                ) : (
                    time &&
                    time.length > 0 &&
                    (time as Array<EachDayEntryType>).map(
                        ({ open, close }, key) => (
                            <View
                                style={styles.timeTextView}
                                key={`Items${key}`}
                            >
                                <Text>
                                    {open.hour} {open.convention}
                                </Text>
                                <Text>{' - '}</Text>
                                <Text>
                                    {close.hour} {close.convention}
                                </Text>
                            </View>
                        )
                    )
                )}
            </View>
        </View>
    );
}
