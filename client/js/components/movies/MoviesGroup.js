import React, { Component, PropTypes } from 'react';
import { NoItems } from '../';
import { MoviesItem } from './';

export default class MoviesGroup extends Component {
    render() {
        const { containerClassname, label, isFavourite, moviesIds, moviesById } = this.props;
        const { addToFavourites, removeFromFavourites, moveMovieUp, moveMovieDown } = this.props;

        return (
            <div className={`movie-items-group movie-items-group-${containerClassname}`}>
                <div className="movie-items-label">
                    { label }
                </div>
                {
                    moviesIds.size > 0 ?
                        moviesIds.map((item, index) =>
                            <MoviesItem
                                key={item}
                                description={moviesById.getIn([item, 'description'])}
                                id={moviesById.getIn([item, 'id'])}
                                isFavourite={isFavourite}
                                isFirst={index === 0}
                                isLast={index === moviesIds.size - 1}
                                shouldRenderArrows={moviesIds.size > 1 && isFavourite}
                                name={moviesById.getIn([item, 'name'])}
                                year={moviesById.getIn([item, 'year'])}
                                addToFavourites={addToFavourites}
                                removeFromFavourites={removeFromFavourites}
                                moveMovieUp={moveMovieUp}
                                moveMovieDown={moveMovieDown}
                            />
                        )
                        : <NoItems itemName="movies"/>
                }
            </div>
        );
    }
}

MoviesGroup.defaultProps = {
    containerClassname: '',
    label: '',
};

MoviesGroup.propTypes = {
    containerClassname: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    moviesIds: PropTypes.object.isRequired,
    moviesById: PropTypes.object.isRequired,
    addToFavourites: PropTypes.func.isRequired,
    removeFromFavourites: PropTypes.func.isRequired,
    moveMovieUp: PropTypes.func.isRequired,
    moveMovieDown: PropTypes.func.isRequired,
};