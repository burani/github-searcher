import {applyMiddleware, combineReducers, createStore} from "redux";

import repositoryListReducer from "./repository-list-reducer";
import thunkMiddleware from "redux-thunk";
import {persistStore} from "redux-persist";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'; //local storage

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['repositoryList']//что нужно персистить
}

const rootReducer = combineReducers({
    repositoryList: repositoryListReducer
});

const withPersistReducer = persistReducer(persistConfig, rootReducer);

// let reducers = combineReducers({
//     repositoryList: repositoryListReducer
// });

export let store = createStore(withPersistReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);

window.store = store;

export default {store, persistor};