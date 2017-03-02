import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './js/containers';
import store from './js/redux/enhancedStore';

const rootElement = document.getElementById('app');
let components = [
    <Root key="root" store={store} />
];

ReactDOM.render(
    <div>{components}</div>,
    rootElement
);
