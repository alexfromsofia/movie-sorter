import React, { Component, PropTypes } from 'react';
import { Image } from '../'

export default class MovieTooltip extends Component {
    render() {
        const { description, id, name, year } = this.props;

        return (
            <div className="movie-item-tooltip">
                <Image imageId={id} />
                <div className="movie-item-name">
                    { `${name} (${year})` }
                </div>
                <div className="movie-item-description">
                    { description }
                </div>
            </div>
        );
    }
}

MovieTooltip.defaultProps = {
    description: '',
    id: '',
    name: '',
    year: '',
};

MovieTooltip.propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
};