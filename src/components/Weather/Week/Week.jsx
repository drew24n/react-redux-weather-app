import React, {memo, useEffect} from 'react';
import style from './Week.module.scss';
import TopSection from "../../common/TopSection/TopSection";
import {useDispatch, useSelector} from "react-redux";
import {setPortionsAmount} from "../../../redux/weatherReducer";
import Preloader from "../../common/Preloader/Preloader";

function Week() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    const date = (index) => new Date(weatherState.weatherData.portions[index].date)
        .toLocaleString('en-US', {month: 'long', day: 'numeric'})

    useEffect(() => {
        dispatch(setPortionsAmount(40))
    }, [dispatch])

    if (weatherState.isFetching) return <Preloader/>

    return (
        <main className={style.container}>
            <TopSection/>
            <div className={style.info}>
                {weatherState.weatherData.portions.length === 40 ?
                    <React.Fragment>
                        <div className={style.date}>
                            <p>Week</p>
                            <p>{date(0)} - {date(33)}</p>
                        </div>
                        <div className={style.daysWrapper}>
                            {weatherState.weatherData.portions.map((p, index) => {
                                if ([0, 8, 16, 25, 33].includes(index)) {
                                    return (
                                        <div key={index} className={style.dayItem}>
                                            <p>{date(index)}</p>
                                            <p>{p.temp} °C</p>
                                            <p>{p.weather}</p>
                                            <p>{p.wind} - meter/s</p>
                                        </div>
                                    )
                                } else return null
                            })}
                        </div>
                    </React.Fragment>
                    : <p>No data available</p>
                }
            </div>
        </main>
    )
}

export default memo(Week)