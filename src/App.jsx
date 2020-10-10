import React, {useEffect} from 'react';
import style from './App.module.scss';
import {Header} from "./components/Header/Header";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Today} from "./components/Weather/Today/Today";
import {Tomorrow} from "./components/Weather/Tomorrow/Tomorrow";
import {Week} from "./components/Weather/Week/Week";
import {useDispatch, useSelector} from "react-redux";
import {getCity, getWeather, setSavedCities} from "./redux/weatherReducer";
import {Default} from "./components/Weather/Default/Default";
import {localStorageService} from "./localStorageService";

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
                dispatch(getCity({lat, lon}))
            }
        })
    }, [dispatch])

    useEffect(() => {
        if (weatherState.searchCity) {
            dispatch(getWeather({
                searchType: weatherState.searchType,
                searchCity: weatherState.searchCity,
                daysAmount: weatherState.daysAmount
            }))
        }
    }, [dispatch, weatherState.searchCity, weatherState.searchType, weatherState.daysAmount])

    useEffect(() => {
        const savedCities = localStorageService.getCities()
        if (savedCities && savedCities.length > 0) {
            dispatch(setSavedCities(JSON.parse(savedCities)))
        }
    }, [dispatch])

    return (
        <div className={style.container}>
            <HashRouter basename={'/'}>
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={Default}/>
                    <Route exact path={'/today'} component={Today}/>
                    <Route exact path={'/tomorrow'} component={Tomorrow}/>
                    <Route exact path={'/week'} component={Week}/>
                </Switch>
            </HashRouter>
        </div>
    )
}