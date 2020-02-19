import Colors from './Colors';
import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../Utils/Scaling';

export default StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray2,
  },
  dateTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    paddingRight: 15,
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Medium',
    fontSize: scaleFontSize(16),
  },
  isTodayText: {
    fontFamily: 'Roboto-Medium',
    textTransform: 'uppercase',
    fontSize: 12,
    color: Colors.green,
  },
  timeTextWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    width: '50%',
  },
  timeTextView: {
    flexDirection: 'row',
    width: 90,
    minWidth: 85,
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    fontSize: scaleFontSize(16),
  },
});
