import {applyMiddleware, combineReducers, createStore} from "redux";

import repositoryListReducer from "./repository-list-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    repositoryList: repositoryListReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;