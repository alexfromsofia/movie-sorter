/* eslint-env jest */
import {
    sortAlphabetically
} from '../../utils/utils';

describe('Utils', () => {
    describe('sortAlphabetically', () => {
        it('should sort alphabetically', () => {
            const unorderedArray = ['b', 'c', 'a'];
            const orderedArray = ['a', 'b', 'c'];
            const result = unorderedArray.sort(sortAlphabetically);

            expect(result).toEqual(orderedArray);
        });
    });
});
