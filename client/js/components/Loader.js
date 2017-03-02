import React, { Component, PropTypes } from 'react';

export default class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        );
    }
}

Loader.defaultProps = {};

Loader.propTypes = {};
