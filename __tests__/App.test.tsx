import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react-native';
import { mount, shallow } from 'enzyme';

import App from '../src/App';
import Item from '../src/Components/Items';
import { json1Output, json6Output } from './json/testExpected';

jest.mock('react-native-vector-icons');
jest.mock('react-native-i18n');
jest.mock('react-native-redash');
jest.mock('react-native-gesture-handler');
jest.mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock')
);
jest.useFakeTimers();

beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('Test setup check', () => {
    it('Render Simple Component', () => {
        const { queryByTestId } = render(
            <Text testID="text">Hello, world!</Text>
        );
        expect(queryByTestId('text')).not.toBeNull();
    });
});

describe('Rendering', () => {
    it('should match to snapshot', () => {
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });

    it('App renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Button Render', () => {
    test('Initial Height', async () => {
        const { getByTestId } = render(<App />);
        const animatedView = getByTestId('animated-view').props.children[0];
        expect(animatedView.props.style.height).toEqual(60);
    });
});

describe('Render', () => {
    test('Initial state, - Loading indicator', async () => {
        const wrapper = shallow(<App />);
        expect(
            wrapper.findWhere(
                node => node.prop('testID') === 'ActivityIndicator'
            )
        ).toBeTruthy();
        expect(wrapper.contains(<Item item={json6Output[0]} />)).toBe(false);
    });

    test('Initial state, -render items', async () => {
        const { getByTestId, queryByTestId } = render(<App />);
        expect(getByTestId('card-view')).toBeTruthy();
        expect(queryByTestId('ActivityIndicator')).toBeNull();
    });

    test('Should render 7 items', async () => {
        const { getAllByTestId } = render(<App />);
        expect(getAllByTestId('list-item').length).toEqual(7);
    });
});

describe('Render list items ', () => {
    test('should show open time', async () => {
        const { getByTestId, queryByTestId } = render(
            <Item item={json1Output[0]} key={0} />
        );
        expect(getByTestId('open.hour')).toBeTruthy();
        expect(queryByTestId('closed-text')).toBeNull();
    });

    test('should show closed', async () => {
        const { getByTestId, queryByTestId } = render(
            <Item item={json6Output[0]} key={0} />
        );
        expect(getByTestId('closed-text')).toBeTruthy();
        expect(queryByTestId('open.hour')).toBeNull();
    });
});
