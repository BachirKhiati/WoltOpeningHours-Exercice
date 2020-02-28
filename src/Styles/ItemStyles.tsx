import { StyleSheet } from 'react-native';
import Colors from './Colors';
import { scaleFontSize } from '../Utils/Scaling';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        borderBottomColor: Colors.gray2,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: '10%',
        width: '100%'
    },
    dateText: {
        fontFamily: 'Roboto-Medium',
        fontSize: scaleFontSize(16),
        paddingRight: 15,
        textTransform: 'capitalize'
    },
    dateTextView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    isTodayText: {
        color: Colors.green,
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    timeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: scaleFontSize(16),
        textAlign: 'right'
    },
    timeTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: 85,
        width: 90
    },
    timeTextWrapper: {
        alignItems: 'flex-end',
        flex: 1,
        width: '50%'
    }
});
