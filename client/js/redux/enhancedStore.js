import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import rootReducer from '../reducers/root';

const store = createStore(
    rootReducer,
    undefined,
    compose(
        autoRehydrate(),
        composeWithDevTools()
    )
);

persistStore(store, {
    transforms: [immutableTransform()]
});

export default store;