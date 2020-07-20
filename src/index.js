import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter, withRouter} from 'react-router-dom'
import {createStore, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import productsReducer  from './store/reducers/productReducer'
import userReducer from './store/reducers/userReducer'
import UIReducer from './store/reducers/UIReducer'


const rootReducers = combineReducers({
    products: productsReducer, 
    users: userReducer, 
    ui:  UIReducer
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    rootReducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
