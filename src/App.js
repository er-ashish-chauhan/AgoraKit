/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import {
    View,
    Button
} from 'react-native';

import Navigation from "./Navigation";
import { Provider } from 'react-redux'
import store from "./Store";
const App = () => {

    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};


export default App;
