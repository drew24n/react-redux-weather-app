import React, {useEffect} from 'react';
import style from './App.module.scss';
import {Header} from "./components/Header/Header";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Today} from "./components/Weather/Today/Today";
import {Tomorrow} from "./components/Weather/Tomorrow/Tomorrow";
import {Week} from "./components/Weather/Week/Week";
import {useDispatch, useSelector} from "react-redux";
import {getWeather, setCoordinates} from "./redux/weatherReducer";
import {Default} from "./components/Weather/Default/Default";

export function App() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        function getCurrentPosition() {
            return new Promise(res => navigator.geolocation.watchPosition(res, () => {
            }, {maximumAge: Number.POSITIVE_INFINITY}))
        }

        getCurrentPosition().then(res => {
            if (res) {
                const lat = res.coords.latitude
                const lon = res.coords.longitude
                dispatch(setCoordinates({lat, lon}))
            }
        })
    }, [dispatch])

    useEffect(() => {
        if (weatherState.city || weatherState.coordinates.lat) {
            dispatch(getWeather({
                searchType: weatherState.searchType,
                city: weatherState.city,
                lat: weatherState.coordinates.lat,
                lon: weatherState.coordinates.lon,
                days: weatherState.days
            }))
        }
    }, [dispatch, weatherState.city, weatherState.searchType, weatherState.days, weatherState.coordinates.lat,
        weatherState.coordinates.lon])

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