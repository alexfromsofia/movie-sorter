import { REHYDRATE } from 'redux-persist/constants';

import Immutable from 'immutable';

const initialState = Immutable.Map({
    isPersistedStateLoading: true
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case REHYDRATE:
            state = state.set('isPersistedStateLoading', false);
            break;
        default:
            break;
    }

    return state;
}
