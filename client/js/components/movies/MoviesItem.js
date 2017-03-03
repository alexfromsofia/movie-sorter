import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { MovieTooltip } from './';
import { noop } from '../../utils/utils';

export default class MoviesItem extends Component {
    constructor() {
        super();

        this.state = {
            isTooltipOpen: false
        };

        this.renderArrows = this.renderArrows.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
        this.onArrowUpClick = this.onArrowUpClick.bind(this);
        this.onArrowDownClick = this.onArrowDownClick.bind(this);
        this.onMovieNameClick = this.onMovieNameClick.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }

    componentDidMount () {
        document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick(event) {
        const { isTooltipOpen } = this.state;

        if (isTooltipOpen && this.refs.movieTitle) {
            const movieTitle = ReactDOM.findDOMNode(this.refs.movieTitle);

            if (!movieTitle.contains(event.target)) {
                this.setState({ isTooltipOpen: false });
            }
        }
    }

    onMovieNameClick() {
        const { isTooltipOpen } = this.state;

        if (isTooltipOpen) {
            this.setState({ isTooltipOpen: false });
        } else {
            this.setState({ isTooltipOpen: true });
        }
    }

    onStarClick() {
        const { isFavourite, id } = this.props;
        const { addToFavourites, removeFromFavourites } = this.props;

        if (isFavourite) {
            removeFromFavourites({ id });
        } else {
            addToFavourites({ id });
        }
    }

    onArrowUpClick() {
        const { id, moveMovieUp } = this.props;

        moveMovieUp({ id });
    }

    onArrowDownClick() {
        const { id, moveMovieDown } = this.props;

        moveMovieDown({ id });
    }

    renderArrowUp() {

        return (
            <i
                className="fa fa-arrow-up"
                aria-hidden="true"
                onClick={this.onArrowUpClick}
            />
        );
    }

    renderArrowDown() {
        return (
            <i
                className="fa fa-arrow-down"
                aria-hidden="true"
                onClick={this.onArrowDownClick}
            />
        );
    }

    renderArrows() {
        const { isFirst, isLast } = this.props;

        if (isFirst) {
            return this.renderArrowDown();
        }

        if (isLast) {
            return this.renderArrowUp();
        }

        if (!isFirst && !isLast) {
            return (
                <div>
                    { this.renderArrowUp() }
                    { this.renderArrowDown() }
                </div>
            );
        }
    }

    render() {
        const { isFavourite, shouldRenderArrows } = this.props;
        const { description, id, name, year } = this.props;
        const { isTooltipOpen } = this.state;

        return (
            <div className="movie-item">
                <i
                    onClick={this.onStarClick}
                    className={classNames('fa', {
                        'fa-star': isFavourite,
                        'fa-star-o': !isFavourite
                    })}
                    aria-hidden="true"
                />
                <div ref="movieTitle" className="movie-item-title" onClick={this.onMovieNameClick}>
                    { `${name} (${year})` }
                </div>
                { shouldRenderArrows ?
                    <div className="movie-item-arrows">
                        { this.renderArrows() }
                    </div>
                    : null
                }
                {
                    isTooltipOpen ?
                        <div ref="movieTooltip">
                            <MovieTooltip
                                description={description}
                                id={id}
                                name={name}
                                year={year}
                                onBlur={this.onMovieNameClick}
                            />
                        </div>
                        : null
                }

            </div>
        );
    }
}

MoviesItem.defaultProps = {
    addToFavourites: noop,
    description: '',
    id: '',
    isFavourite: false,
    isFirst: false,
    isLast: false,
    moveMovieDown: noop,
    moveMovieUp: noop,
    name: '',
    removeFromFavourites: noop,
    shouldRenderArrows: false,
    year: 0,
};

MoviesItem.propTypes = {
    addToFavourites: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
    moveMovieDown: PropTypes.func.isRequired,
    moveMovieUp: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    removeFromFavourites: PropTypes.func.isRequired,
    shouldRenderArrows: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
};
