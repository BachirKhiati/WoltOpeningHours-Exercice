import Colors from './Colors';
import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../Utils/FontScaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    width: '60%',
    height: 60,
    borderRadius: 10,
  },
  animationContainer: {
    flexDirection: 'column',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  visibleView: {
    flexDirection: 'row',
    height: 60,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visibleViewText: {
    fontFamily: 'Roboto-Bold',
    fontSize: scaleFontSize(24),
  },
  minimizedView: {
    marginTop: 10,
    borderTopColor: Colors.black,
    borderTopWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    overflow: 'hidden',
  },
});
