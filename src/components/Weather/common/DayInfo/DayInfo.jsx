import React from 'react';
import style from './DayInfo.module.scss';
import {useSelector} from "react-redux";
import {CityMap} from "./CityMap/CityMap";

export function DayInfo({history}) {
    const weatherState = useSelector(state => state.weather)

    const date = new Date(weatherState.weatherData.days[0].time * 1000).toLocaleString('en-US', {
        month: 'long', day: 'numeric'
    })
    const time = new Date(weatherState.weatherData.days[0].time * 1000).toLocaleString('en-GB', {
        hour: 'numeric', minute: 'numeric'
    })

    return (
        <div className={style.weatherWrapper}>
            <div className={style.info}>
                {weatherState.weatherData.city
                    ? <>
                        <div className={style.day}>
                            {history && history.location.pathname === "/today" ? <p>Today</p> : <p>Tomorrow</p>}
                            <p>{date}</p>
                        </div>
                        <div className={style.data}>
                            <p>Time</p>
                            <p>Weather</p>
                            <span>{time}</span>
                            <span>{weatherState.weatherData.days[0].temp} °C, {weatherState.weatherData.days[0].weather}
                                , {weatherState.weatherData.days[0].wind} - meter per second</span>
                        </div>
                    </>
                    : <p className={style.noData}>No data available</p>
                }
            </div>
            <CityMap/>
        </div>
    )
}