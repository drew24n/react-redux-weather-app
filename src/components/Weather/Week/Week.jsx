import React, {useEffect} from 'react';
import style from './Week.module.scss';
import {TopSection} from "../common/TopSection/TopSection";
import {useDispatch, useSelector} from "react-redux";
import {setPortionsAmount} from "../../../redux/weatherReducer";

export function Week() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    const date = (date) => new Date(date).toLocaleString('en-US', {
        month: 'long', day: 'numeric'
    })

    useEffect(() => {
        dispatch(setPortionsAmount(40))
    }, [dispatch])

    return (
        <div className={style.container}>
            <TopSection/>
            <div className={style.info}>
                {weatherState.weatherData.portions.length > 14 ?
                    <React.Fragment>
                        <div className={style.date}>
                            <p>Week</p>
                            <p>{`${date(weatherState.weatherData.portions[0].date)} 
                            - ${date(weatherState.weatherData.portions[33].date)}`}</p>
                        </div>
                        <div className={style.daysWrapper}>
                            {weatherState.weatherData.portions.map((p, index) => {
                                if (index === 0 || index === 8 || index === 16 || index === 25 || index === 33) {
                                    return (
                                        <div key={index} className={style.dayItem}>
                                            <p>Date: {date(p.date)}</p>
                                            <p>Temp: {p.temp} °C</p>
                                            <p>Weather: {p.weather}</p>
                                            <p>Wind: {p.wind} - meter/s</p>
                                        </div>
                                    )
                                } else return null
                            })}
                        </div>
                    </React.Fragment>
                    : <p>No data available</p>
                }
            </div>
        </div>
    )
}