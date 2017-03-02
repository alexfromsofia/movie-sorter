/* eslint-env jest */
import Immutable from 'immutable';
import {
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    CONSUME_MOVIES,
    MOVE_MOVIE_UP,
    MOVE_MOVIE_DOWN
} from '../../constants/movies';
import reducer, { initialState } from '../movies';
import {
    consumeMovies,
    addToFavourites,
    removeFromFavourites,
    moveMovieUp,
    moveMovieDown
} from '../../actions/movies';

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

describe('Movies reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    describe(CONSUME_MOVIES, () => {
        it('should consume movies', () => {
            const action = consumeMovies({ movies: mockedMovies });
            const received = reducer(initialState, action);
            const expected = mockedState;

            expect(received).toEqual(expected);
        });

        it('should not contain duplicated movies', () => {
            const newMovies = [mockedMovies[0], mockedMovies[1]];
            const currentState = mockedState;
            const action = consumeMovies({ movies: newMovies });
            const received = reducer(currentState, action);
            const expected = currentState;

            expect(received).toEqual(expected);
        });

        it('should update the data of already added movies', () => {
            const changedMovies = [
                mockedMovies[0],
                {
                    ...mockedMovies[1],
                    isFavourite: true
                },
                mockedMovies[2]

            ];
            const currentState = mockedState;
            const action = consumeMovies({ movies: changedMovies });
            const received = reducer(currentState, action);
            const expected = currentState.merge({
                moviesById: {
                    [changedMovies[0].id]: changedMovies[0],
                    [changedMovies[1].id]: changedMovies[1],
                    [changedMovies[2].id]: changedMovies[2]
                },
                moviesIds: [changedMovies[0].id, changedMovies[1].id, changedMovies[2].id]
            });

            expect(received).toEqual(expected);
        });
    });

    describe(ADD_TO_FAVOURITES, () => {
        it('should add a movie to favourites', () => {

            const currentState = mockedState;
            const movieId = mockedMovies[2].id;
            const action = addToFavourites({ id: movieId });
            const received = reducer(currentState, action);

            expect(received.getIn(['moviesById', movieId, 'isFavourite'])).toBe(true);
        });

        it('should add a movie to moviesIds last index', () => {
            const currentState = mockedState;
            const movieId = mockedMovies[0].id;
            const action = addToFavourites({ id: movieId });
            const received = reducer(currentState, action);
            const receivedStateMovieIndex = received.get('moviesIds').indexOf(movieId);

            expect(receivedStateMovieIndex).toBe(mockedMovies.length - 1);
        });
    });

    describe(REMOVE_FROM_FAVOURITES, () => {
        it('should remove a movie from favourites', () => {

            const currentState = mockedState;
            const movieId = mockedMovies[0].id;
            const action = removeFromFavourites({ id: movieId });
            const received = reducer(currentState, action);

            expect(received.getIn(['moviesById', movieId, 'isFavourite'])).toBe(false);
        });
    });

    describe(MOVE_MOVIE_UP, () => {
        it('should move up a favourite movie', () => {
            const mockedFavouriteMovies = mockedMovies.map(movie => {
                return {
                    ...movie,
                    isFavourite: true
                };
            });
            const currentState = initialState.merge({
                moviesById: {
                    [mockedFavouriteMovies[0].id]: Immutable.fromJS(mockedFavouriteMovies[0]),
                    [mockedFavouriteMovies[1].id]: Immutable.fromJS(mockedFavouriteMovies[1]),
                    [mockedFavouriteMovies[2].id]: Immutable.fromJS(mockedFavouriteMovies[2])
                },
                moviesIds: [mockedFavouriteMovies[0].id, mockedFavouriteMovies[1].id, mockedFavouriteMovies[2].id]
            });
            const movieId = mockedFavouriteMovies[1].id;
            const action = moveMovieUp({ id: movieId });
            const received = reducer(currentState, action);
            const currentStateMovieIndex = currentState.get('moviesIds').indexOf(movieId);
            const receivedStateMovieIndex = received.get('moviesIds').indexOf(movieId);

            expect(receivedStateMovieIndex).toEqual(currentStateMovieIndex - 1);
        });
    });

    describe(MOVE_MOVIE_DOWN, () => {
        it('should move down a favourite movie', () => {
            const mockedFavouriteMovies = mockedMovies.map(movie => {
                return {
                    ...movie,
                    isFavourite: true
                };
            });
            const currentState = initialState.merge({
                moviesById: {
                    [mockedFavouriteMovies[0].id]: Immutable.fromJS(mockedFavouriteMovies[0]),
                    [mockedFavouriteMovies[1].id]: Immutable.fromJS(mockedFavouriteMovies[1]),
                    [mockedFavouriteMovies[2].id]: Immutable.fromJS(mockedFavouriteMovies[2])
                },
                moviesIds: [mockedFavouriteMovies[0].id, mockedFavouriteMovies[1].id, mockedFavouriteMovies[2].id]
            });
            const movieId = mockedFavouriteMovies[1].id;
            const action = moveMovieDown({ id: movieId });
            const received = reducer(currentState, action);
            const currentStateMovieIndex = currentState.get('moviesIds').indexOf(movieId);
            const receivedStateMovieIndex = received.get('moviesIds').indexOf(movieId);

            expect(receivedStateMovieIndex).toEqual(currentStateMovieIndex + 1);
        });
    });
});
