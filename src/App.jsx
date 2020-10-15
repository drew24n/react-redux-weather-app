import React, {useEffect} from 'react';
import style from './App.module.scss';
import {Header} from "./components/Header/Header";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Today} from "./components/Weather/Today/Today";
import {Tomorrow} from "./components/Weather/Tomorrow/Tomorrow";
import {Week} from "./components/Weather/Week/Week";
import {useDispatch, useSelector} from "react-redux";
import {getWeather, setSavedCities, setSearchByCoordinates, setSearchCity} from "./redux/weatherReducer";
import {Default} from "./components/Weather/Default/Default";
import {localStorageService} from "./localStorageService";
import {getCityApi} from "./api/locationAPI";

export function App() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        function getCurrentPosition() {
            return new Promise((res, err) => {
                navigator.geolocation.getCurrentPosition(res, err)
            })
        }

        getCurrentPosition()
            .then(res => {
                const lat = res.coords.latitude
                const lon = res.coords.longitude
                dispatch(setSearchByCoordinates({lat, lon}))
            })
            .catch(async () => {
                const res = await getCityApi()
                if (res.data.city) {
                    dispatch(setSearchCity(res.data.city))
                }
            })
    }, [dispatch])

    useEffect(() => {
        if (weatherState.searchCity || weatherState.searchByCoordinates.lat) {
            dispatch(getWeather({
                city: weatherState.searchCity,
                portions: weatherState.searchPortions,
                lat: weatherState.searchByCoordinates.lat,
                lon: weatherState.searchByCoordinates.lon
            }))
        }
    }, [dispatch, weatherState.searchCity, weatherState.searchPortions, weatherState.searchByCoordinates.lat,
        weatherState.searchByCoordinates.lon])

    useEffect(() => {
        const savedCities = localStorageService.getCities()
        if (savedCities && savedCities.length) {
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