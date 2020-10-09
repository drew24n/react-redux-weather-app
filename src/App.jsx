import React, {useEffect} from 'react';
import style from './App.module.scss';
import {Header} from "./components/Header/Header";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Today} from "./components/Weather/Today/Today";
import {Tomorrow} from "./components/Weather/Tomorrow/Tomorrow";
import {Week} from "./components/Weather/Week/Week";
import {useDispatch, useSelector} from "react-redux";
import {getWeather, setOptions} from "./redux/weatherReducer";
import {Default} from "./components/Weather/Default/Default";

export function App() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    let watchId

    function getCurrentPosition() {
        return new Promise(res => {
            return watchId = navigator.geolocation.watchPosition(res)
        })
    }

    useEffect(() => {
        getCurrentPosition().then(function (res) {
            if (res) {
                const lat = res.coords.latitude
                const lon = res.coords.longitude
                dispatch(setOptions({forecast: 'weather', city: '', lat, lon, days: ''}))
                navigator.geolocation.clearWatch(watchId)
            }
        })
    })

    useEffect(() => {
        if (weatherState.options.city || weatherState.options.lat) {
            dispatch(getWeather({
                forecast: weatherState.options.forecast,
                city: weatherState.options.city,
                lat: weatherState.options.lat,
                lon: weatherState.options.lon,
                days: weatherState.options.days
            }))
        }
    }, [dispatch, weatherState.options.city, weatherState.options.forecast, weatherState.options.days,
        weatherState.options.lat, weatherState.options.lon])

    return (
        <div className={style.container}>
            <HashRouter basename={'/'}>
                <Header/>
                <Switch>
                    <Route exact path={'/'}><Default/></Route>
                    <Route exact path={'/today'}><Today/></Route>
                    <Route exact path={'/tomorrow'}><Tomorrow/></Route>
                    <Route exact path={'/week'}><Week/></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}