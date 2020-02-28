import { StyleSheet } from 'react-native';
import Colors from './Colors';
import { scaleFontSize, normalizeHeight } from '../Utils/Scaling';

export default StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27
    },
    btnFloating: {
        alignItems: 'center',
        backgroundColor: Colors.green,
        borderRadius: 100,
        bottom: normalizeHeight(50),
        elevation: 10,
        height: 40,
        justifyContent: 'center',
        left: 30,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        width: 40
    },
    btnWrapper: {
        borderRadius: 10,
        flexDirection: 'row',
        height: 60,
        width: '60%'
    },
    container: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        flex: 1,
        justifyContent: 'center'
    },
    minimizedView: {
        alignItems: 'center',
        borderTopColor: Colors.black,
        borderTopWidth: 1,
        justifyContent: 'center',
        overflow: 'hidden',
        width: '90%'
    },
    textFloating: {
        color: Colors.white,
        textTransform: 'uppercase'
    },
    visibleView: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-around',
        width: '95%'
    },
    visibleViewText: {
        color: Colors.white,
        fontFamily: 'Roboto-Bold',
        fontSize: scaleFontSize(24)
    }
});
