import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {weatherReducer} from "./weatherReducer";
import thunk from "redux-thunk";
import {locationReducer} from "./locationReducer";

const rootReducer = combineReducers({
    weather: weatherReducer,
    currentLocation: locationReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))