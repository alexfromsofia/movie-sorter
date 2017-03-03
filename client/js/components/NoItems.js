import React, { PropTypes } from 'react';

const NoItems = ({ itemName }) => (
    <div className="no-items">
        { `No ${itemName}` }
    </div>
);

NoItems.propTypes = {
    itemName: PropTypes.string.isRequired
};

export default NoItems;