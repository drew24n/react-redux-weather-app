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
                {weatherState.weatherData.portions[0].date ?
                    <React.Fragment>
                        <div className={style.date}>
                            <p>Week</p>
                            <p>Date</p>
                        </div>
                        <div className={style.daysWrapper}>
                            {weatherState.weatherData.portions.map((p, index) => {
                                return (
                                    <div key={index} className={style.dayItem}>
                                        <p>{date(p.date)}</p>
                                        <p>{p.temp} °C</p>
                                        <p>{p.weather}</p>
                                        <p>{p.wind} - meter / s</p>
                                    </div>
                                )
                            })}
                        </div>
                    </React.Fragment>
                    : <p>No data available</p>
                }
            </div>
        </div>
    )
}