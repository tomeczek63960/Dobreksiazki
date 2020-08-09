import { createStore, applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import productsReducer from './reducers/productsReducer';
import basketReducer from './reducers/basketReducer';

const store = createStore(
    combineReducers( { authReducer, productsReducer, basketReducer } ),
    composeWithDevTools( applyMiddleware( thunk ) )
);

export default store;