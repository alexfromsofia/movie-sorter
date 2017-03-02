import {
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    CONSUME_MOVIES,
    MOVE_MOVIE_UP,
    MOVE_MOVIE_DOWN
} from '../../constants/movies';
import {
    consumeMovies,
    addToFavourites,
    removeFromFavourites,
    moveMovieUp,
    moveMovieDown
} from '../../actions/movies';

describe('Movies actions', () => {
    describe('addToFavourites()', () => {
        it('should create ADD_TO_FAVOURITES action', () => {
            const id = 'test';
            const received = addToFavourites({ id });
            const expected = {
                type: ADD_TO_FAVOURITES,
                payload: { id }
            };

            expect(received).toEqual(expected);
        });
    });

    describe('removeFromFavourites()', () => {
        it('should create REMOVE_FROM_FAVOURITES action', () => {
            const id = 'test';
            const received = removeFromFavourites({ id });
            const expected = {
                type: REMOVE_FROM_FAVOURITES,
                payload: { id }
            };

            expect(received).toEqual(expected);
        });
    });

    describe('consumeMovies()', () => {
        it('should create CONSUME_MOVIES action', () => {
            const movies = [{id: 'test'}];
            const received = consumeMovies({ movies });
            const expected = {
                type: CONSUME_MOVIES,
                payload: { movies }
            };

            expect(received).toEqual(expected);
        });
    });

    describe('moveMovieDown()', () => {
        it('should create MOVE_MOVIE_DOWN action', () => {
            const id = 'test';
            const received = moveMovieDown({ id });
            const expected = {
                type: MOVE_MOVIE_DOWN,
                payload: { id }
            };

            expect(received).toEqual(expected);
        });
    });

    describe('moveMovieUp()', () => {
        it('should create MOVE_MOVIE_UP action', () => {
            const id = 'test';
            const received = moveMovieUp({ id });
            const expected = {
                type: MOVE_MOVIE_UP,
                payload: { id }
            };

            expect(received).toEqual(expected);
        });
    });
});