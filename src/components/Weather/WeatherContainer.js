import React, {useEffect} from 'react';
import style from './WeatherContainer.module.scss';
import {getWeather} from "../../redux/weatherReducer";
import {useDispatch} from "react-redux";

export function WeatherContainer() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWeather('Moscow'))
    }, [dispatch])

    return (
        <div className={style.container}>
        </div>
    )
}