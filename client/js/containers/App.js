import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MoviesContainer } from './';

class App extends Component {
    // TODO: 0. ESLINT!!!! 1. make loader, 2. write tests 3. add transitions 4. style tooltip 5. add document click event and use tooltip ref to toggle it
    render() {
        const { isPersistedStateLoading } = this.props;
        return (
            
            <div className="app-wrapper">
                { isPersistedStateLoading ?
                    <div>Loading</div>
                    : <MoviesContainer />
                }
            </div>
        );
    }
}

App.displayName = 'App';

App.propTypes = {
    isPersistedStateLoading: PropTypes.bool.isRequired
};

export default connect(
    //	Map state to props
    state => ({
        isPersistedStateLoading: state.persistState.get('isPersistedStateLoading'),
    }),
    //	Bind actions to props
    dispatch => bindActionCreators({}, dispatch)
)(App);
