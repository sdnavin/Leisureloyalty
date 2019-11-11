/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry,StatusBar} from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './src/ProfileStore';
import {name as appName} from './app.json';


const wrapApp = () =>{
    return(
        <Provider store = {store} >
            <StatusBar barStyle="light-content" /> 
            <App/>
        </Provider>
    )
};

AppRegistry.registerComponent('Leisureloyalty', () => wrapApp);
