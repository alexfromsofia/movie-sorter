/* eslint-env jest */
/* eslint-disable no-console */
/* Silence React errors during tests */
console.error = noop;
/* eslint-enable no-console */
import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import { initialState } from '../../../reducers/movies';
import { NoItems } from '../../../components';
import { MoviesGroup, MoviesItem } from '../../../components/movies';
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
const mockedMovies = [
    {
        id: 'pi_1998',
        name: 'Pi',
        year: 1998,
        description: 'A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery. While cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger.',
        isFavourite: true
    },
    {
        id: 'armageddon_1998',
        name: 'Armageddon',
        year: 1998,
        description: 'After discovering that an asteroid the size of Texas is going to impact Earth in less than a month, N.A.S.A. recruits a misfit team of deep core drillers to save the planet.',
        isFavourite: false
    },
    {
        id: 'heat_1995',
        name: 'Heat',
        year: 1995,
        description: 'A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.',
        isFavourite: false
    }
];

const mockedState = initialState.merge({
    moviesById: {
        [mockedMovies[0].id]: Immutable.fromJS(mockedMovies[0]),
        [mockedMovies[1].id]: Immutable.fromJS(mockedMovies[1]),
        [mockedMovies[2].id]: Immutable.fromJS(mockedMovies[2])
    },
    moviesIds: [mockedMovies[0].id, mockedMovies[1].id, mockedMovies[2].id]
});

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

    it('it should render <MoviesItem />', () => {
        const moviesIds = mockedState.get('moviesIds');
        const moviesById = mockedState.get('moviesById');
        const wrapper = shallow(
            <MoviesGroup
                moviesIds={moviesIds}
                moviesById={moviesById}
            />
        );

        expect(MoviesItem).toBeDefined();
    });

    it('it should render exact number of <MoviesItem />', () => {
        const moviesIds = mockedState.get('moviesIds');
        const moviesById = mockedState.get('moviesById');
        const wrapper = shallow(
            <MoviesGroup
                moviesIds={moviesIds}
                moviesById={moviesById}
            />
        );
        const expected = moviesIds.size;
        const received = wrapper.find('MoviesItem').length;

        expect(received).toEqual(expected);
    });

    describe('if no moviesIds exist', () => {
        it('should render <NoItems />', () => {
            shallow(<MoviesGroup />);

            expect(NoItems).toBeDefined();
        });
    });
});
