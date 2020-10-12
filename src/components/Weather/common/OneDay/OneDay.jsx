import React from 'react';
import style from './OneDay.module.scss';
import {useSelector} from "react-redux";
import {Map} from "./Map/Map";

export function OneDay({history}) {
    const weatherState = useSelector(state => state.weather)
    const path = history.location.pathname

    const today = new Date(weatherState.weatherData.portions[0].date).toLocaleString('en-US', {
        month: 'long', day: 'numeric'
    })

    let tomorrow = new Date(weatherState.weatherData.portions[0].date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow = tomorrow.toLocaleString('en-US', {
        month: 'long', day: 'numeric'
    })

    const time = (timestamp) => new Date(timestamp * 1000).toLocaleString('en-GB', {
        hour: 'numeric', minute: 'numeric'
    })

    return (
        <div className={style.weatherWrapper}>
            <div className={style.info}>
                {weatherState.weatherData.city
                    ? <>
                        <div className={style.day}>
                            {path === "/today"
                                ? <><p>Today</p><p>{today}</p></>
                                : <><p>Tomorrow</p><p>{tomorrow}</p></>
                            }
                        </div>
                        <div className={style.data}>
                            <p>Time</p>
                            <p>Weather</p>
                            {weatherState.weatherData.portions.map((p, index) => {
                                const receivedDate = new Date(p.date)
                                    .toLocaleString('en-US', {month: 'long', day: 'numeric'})
                                if (receivedDate === today && path === "/today") {
                                    return (
                                        <React.Fragment key={index}>
                                            <span>{time(p.time)}</span>
                                            <span>{p.temp} °C, {p.weather}, {p.wind} - meter per second</span>
                                        </React.Fragment>
                                    )
                                } else if (receivedDate === tomorrow.toString() && path === "/tomorrow") {
                                    return (
                                        <React.Fragment key={index}>
                                            <span>{time(p.time)}</span>
                                            <span>{p.temp} °C, {p.weather}, {p.wind} - meter per second</span>
                                        </React.Fragment>
                                    )
                                } else return null
                            })}
                        </div>
                    </>
                    : <p className={style.noData}>No data available</p>
                }
            </div>
            <Map/>
        </div>
    )
}