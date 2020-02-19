/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {NativeModules, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

//import int settings
import './src/I18n/I18n';

//set splash screen  to white(in this case) after a small delay - better visual.
Platform.OS === 'android' && NativeModules.RNSplashScreen.removeSplashScreen(1000);
AppRegistry.registerComponent(appName, () => App);
