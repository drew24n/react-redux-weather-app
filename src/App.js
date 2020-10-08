import React, {useEffect} from 'react';
import style from './App.module.scss';
import {Header} from "./components/Header/Header";
import {HashRouter, Route, Switch} from "react-router-dom";
import {DefaultSection} from "./components/Weather/DefaultSection/DefaultSection";
import {TodaySection} from "./components/Weather/TodaySection/TodaySection";
import {TomorrowSection} from "./components/Weather/TomorrowSection/TomorrowSection";
import {WeekSection} from "./components/Weather/WeekSection/WeekSection";
import {useDispatch} from "react-redux";
import {getCurrentCity} from "./redux/locationReducer";
import {getWeather} from "./redux/weatherReducer";
import {store} from "./redux/store";

export function App() {
    const dispatch = useDispatch()

    function getPosition() {
        return new Promise((res) => {
            navigator.geolocation.getCurrentPosition(res)
        })
    }

    useEffect(() => {
        getPosition().then((async res => {
            if (res) {
                const lat = res.coords.latitude
                const lng = res.coords.longitude
                await dispatch(getCurrentCity(lat, lng))
                dispatch(getWeather(store.getState().currentLocation.city))
            }
        }))
    })

    return (
        <div className={style.container}>
            <HashRouter basename={'/'}>
                <Header/>
                <Switch>
                    <Route exact path={'/'}><DefaultSection/></Route>
                    <Route exact path={'/today'}><TodaySection/></Route>
                    <Route exact path={'/tomorrow'}><TomorrowSection/></Route>
                    <Route exact path={'/week'}><WeekSection/></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}