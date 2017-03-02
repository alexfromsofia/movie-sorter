import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
    render() {
        const { imageId, onClick } = this.props;
        const imageUrl = require(`../../images/${imageId}.jpg`);

        return (
            <div className="image-wrapper" onClick={onClick}>
                <img
                    className={`image-${imageId}`}
                    src={imageUrl}
                    alt=""
                />
            </div>
        );
    }
}

Icon.defaultProps = {
    imageId: '',
    onClick: () => {}
};

Icon.propTypes = {
    imageId: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
