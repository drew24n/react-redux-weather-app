import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {weatherReducer} from "./weatherReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    weather: weatherReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))