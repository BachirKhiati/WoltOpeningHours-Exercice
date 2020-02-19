/**
 * @format
 */

import 'react-native';
import React from 'react';

import App from '../src/App';

jest.mock('react-native-vector-icons');
jest.mock('react-native-i18n');
jest.mock('react-native-redash');
jest.mock('react-native-gesture-handler');
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.useFakeTimers();
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
