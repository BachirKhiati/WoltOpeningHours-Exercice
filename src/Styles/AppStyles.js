import Colors from './Colors';
import {StyleSheet} from 'react-native';
import {scaleFontSize, normalizeHeight} from '../Utils/Scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  visibleViewText: {
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: scaleFontSize(24),
  },
  minimizedView: {
    borderTopColor: Colors.black,
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    overflow: 'hidden',
  },
  btnFloating: {
    width: 40,
    position: 'absolute',
    bottom: normalizeHeight(50),
    left: 30,
    height: 40,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textFloating: {
    textTransform: 'uppercase',
    color: Colors.white,
  },
});
