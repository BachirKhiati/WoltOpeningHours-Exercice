import Colors from './Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray2,
  },
  dateText: {
    paddingRight: 15,
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  isTodayText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: Colors.green,
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});
