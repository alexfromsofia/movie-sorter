import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NoItems } from '../components';
import { MoviesGroup } from '../components/movies';
import {
    addToFavourites,
    removeFromFavourites,
    consumeMovies,
    moveMovieUp,
    moveMovieDown
} from '../actions/movies';

class MoviesContainer extends Component {
    componentWillMount() {
        const { moviesIds, consumeMovies } = this.props;
        // in a real life app fetch from server via redux thunk or redux-saga
        if (!moviesIds.size) {
            consumeMovies();
        }
    }

    render() {
        const { moviesIds, moviesById } = this.props;
        const { addToFavourites, removeFromFavourites, moveMovieUp, moveMovieDown } = this.props;
        const favouriteMovies = moviesIds
            .filter(item => moviesById.getIn([ item, 'isFavourite' ]));
        const allOtherMovies = moviesIds
            .filter(item => !moviesById.getIn([ item, 'isFavourite' ]))
            .sort((a, b) => a === b ? 0 : a < b ? -1 : 1); //sort alphabetically
        const commonProps = {
            addToFavourites,
            removeFromFavourites,
            moviesById,
            moveMovieUp,
            moveMovieDown
        };

        if (!moviesIds.size) {
            return (
                <section className="movies-container">
                    <NoItems itemName="movies"/>
                </section>
            );
        }

        return (
            <section className="movies-container">
                <MoviesGroup
                    label="Favourites"
                    containerClassname="favourites"
                    moviesIds={favouriteMovies}
                    isFavourite={true}
                    {...commonProps}
                />
                <MoviesGroup
                    label="All Movies"
                    containerClassname="all-other"
                    moviesIds={allOtherMovies}
                    isFavourite={false}
                    {...commonProps}
                />
            </section>
        );
    }
}

MoviesContainer.displayName = 'MoviesContainer';

MoviesContainer.propTypes = {
    addToFavourites: PropTypes.func.isRequired,
    consumeMovies: PropTypes.func.isRequired,
    moveMovieDown: PropTypes.func.isRequired,
    moveMovieUp: PropTypes.func.isRequired,
    moviesById: PropTypes.object.isRequired,
    moviesIds: PropTypes.object.isRequired,
    removeFromFavourites: PropTypes.func.isRequired,
};

export default connect(
    //	Map state to props
    state => ({
        moviesIds: state.movies.get('moviesIds'),
        moviesById: state.movies.get('moviesById'),
    }),
    //	Bind actions to props
    dispatch => bindActionCreators({
        addToFavourites,
        removeFromFavourites,
        consumeMovies,
        moveMovieUp,
        moveMovieDown
    }, dispatch)
)(MoviesContainer);
