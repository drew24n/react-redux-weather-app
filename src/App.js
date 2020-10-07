import React from 'react';
import style from './App.module.scss';
import {WeatherContainer} from "./components/Weather/WeatherContainer";

export function App() {
    return (
        <div className={style.container}>
            <WeatherContainer/>
        </div>
    )
}