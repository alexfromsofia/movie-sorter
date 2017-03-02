import {
    movies,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    CONSUME_MOVIES,
    MOVE_MOVIE_UP,
    MOVE_MOVIE_DOWN
} from '../constants/movies';

export function consumeMovies() {
    return {
        type: CONSUME_MOVIES,
        payload: { movies }
    }
}

export function addToFavourites({ id }) {
    return {
        type: ADD_TO_FAVOURITES,
        payload: { id }
    }
}

export function removeFromFavourites({ id }) {
    return {
        type: REMOVE_FROM_FAVOURITES,
        payload: { id }
    }
}

export function moveMovieUp({ id }) {
    return {
        type: MOVE_MOVIE_UP,
        payload: { id }
    }
}

export function moveMovieDown({ id }) {
    return {
        type: MOVE_MOVIE_DOWN,
        payload: { id }
    }
}