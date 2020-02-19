/**
 * @format
 */

import {Convert} from '../src/Utils/Conversion';
import Json from './json/testInput';
import expectedJson from './json/testExpected';

describe('App', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3);
  });
});

describe('test convention function', () => {
  it('should match result', () => {
    const response = Convert(Json);
    expect(response).toEqual(expectedJson);
  });
});
