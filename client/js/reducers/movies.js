import {
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    CONSUME_MOVIES,
    MOVE_MOVIE_UP,
    MOVE_MOVIE_DOWN
} from '../constants/movies';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    moviesIds: Immutable.List(),
    moviesById: Immutable.Map()
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case CONSUME_MOVIES:
            state = state.set('moviesIds', action.payload.movies.reduce((acc, movie) => acc.push(movie.id), Immutable.List()));
            state = state.set('moviesById', action.payload.movies.reduce((acc, movie) => acc.set(movie.id, Immutable.Map(movie)), Immutable.Map()));
            break;
        case ADD_TO_FAVOURITES:
            state = state.setIn([ 'moviesById', action.payload.id, 'isFavourite' ], true);
            break;
        case REMOVE_FROM_FAVOURITES:
            state = state.setIn([ 'moviesById', action.payload.id, 'isFavourite' ], false);
            break;
        case MOVE_MOVIE_UP: {
            const currentIndex = state.get('moviesIds').indexOf(action.payload.id);

            state = state.set('moviesIds', state.get('moviesIds')
                .splice(currentIndex, 1)
                .splice(currentIndex - 1, 0, action.payload.id));
            break;
        }
        case MOVE_MOVIE_DOWN: {
            const currentIndex = state.get('moviesIds').indexOf(action.payload.id);

            state = state.set('moviesIds', state.get('moviesIds')
                .splice(currentIndex, 1)
                .splice(currentIndex + 1, 0, action.payload.id));
            break;
        }
        default:
            break;
    }

    return state;
}
