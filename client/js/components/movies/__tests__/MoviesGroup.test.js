/* eslint-env jest */
/* eslint-disable no-console */
/* Silence React errors during tests */
console.error = noop;
/* eslint-enable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import { NoItems } from '../../../components';
import { MoviesGroup } from '../../../components/movies';
import { noop } from '../../../utils/utils';

const defaultProps = {
    containerClassname: '',
    label: '',
    isFavourite: false,
    addToFavourites: noop,
    removeFromFavourites: noop,
    moveMovieUp: noop,
    moveMovieDown: noop
};
const containerClassName = 'movie-items-group';
const labelClassName = 'movie-items-label';

describe('<MoviesGroup />', () => {
    it('should render a div', () => {
        const wrapper = shallow(<MoviesGroup {...defaultProps} />);
        const received = wrapper.type();
        const expected = 'div';

        expect(expected).toEqual(received);
    });

    it('should render a span with correct className', () => {
        const newProps = {
            ...defaultProps,
            containerClassname: 'test'
        };
        const wrapper = shallow(<MoviesGroup {...newProps} />);
        const received = wrapper.props().className;
        const expected = `${containerClassName} ${containerClassName}-${newProps.containerClassname}`;

        expect(received).toEqual(expected);
    });

    it('should fallback to default props', () => {
        const wrapper = shallow(<MoviesGroup />);

        expect(wrapper.instance().props).toEqual(defaultProps);
    });

    it(`should render a div with ${labelClassName} className`, () => {
        const wrapper = shallow(<MoviesGroup />);
        const received = wrapper.find(`.${labelClassName}`).length;
        const expected = 1;

        expect(received).toEqual(expected);
    });

    describe('if no moviesIds exist', () => {
        it('should render <NoItems />', () => {
            const wrapper = shallow(<MoviesGroup />);
           // console.log(wrapper.debug())

            expect(NoItems).toBeDefined();
        });
    });
    //TODO: test if Component renders MoviesItem
});
