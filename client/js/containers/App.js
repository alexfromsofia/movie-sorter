import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from '../components';
import { MoviesContainer } from './';

class App extends Component {
    render() {
        const { isPersistedStateLoading } = this.props;
        return (

            <div className="app-wrapper">
                { isPersistedStateLoading ?
                    <Loader />
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
