import { Convert } from '../src/Utils/Conversion';
import { json1, json2, json3, json4, json5 } from './json/testInput';
import {
    json1Output,
    json2Output,
    json3Output,
    json4Output,
    json5Output
} from './json/testExpected';

describe('App', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });
});

describe('test convention function', () => {
    it('Empty json Should return empty array', () => {
        const response = Convert({});
        expect(response).toStrictEqual([]);
    });

    it('should match default json- Case staying over next day.', () => {
        const response = Convert(json1);
        expect(response).toStrictEqual(json1Output);
    });

    it('should match json2- input.json File- Monday case', () => {
        const response = Convert(json2);
        expect(response.length).toEqual(7);
        expect(response).toStrictEqual(json2Output);
    });
    it('should match json3- from pdf example', () => {
        const response = Convert(json3);
        expect(response.length).toEqual(2);
        expect(response).toStrictEqual(json3Output);
    });

    it('should match json4- from pdf final example', () => {
        const response = Convert(json4);
        expect(response.length).toEqual(7);
        expect(response).toStrictEqual(json4Output);
    });

    it('should match json5 - all closed', () => {
        const response = Convert(json5);
        expect(response.length).toEqual(7);
        expect(response).toStrictEqual(json5Output);
    });
});
