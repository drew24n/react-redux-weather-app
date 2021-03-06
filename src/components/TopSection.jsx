import React from 'react';
import style from '../styles/TopSection.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {saveCity} from "../redux/weather";

function TopSection({history}) {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    return (
        <section className={style.container}>
            <div className={style.info}>
                {weatherState.weatherData.city
                    ? <>
                        <p className={style.temp}>{weatherState.weatherData.portions[0].temp} °C</p>
                        <p className={style.address}>{weatherState.weatherData.city}, {weatherState.weatherData.country}</p>
                        {history && history.location.pathname === "/" &&
                        <p className={style.weather}>{weatherState.weatherData.portions[0].weather}, Wind
                            - {weatherState.weatherData.portions[0].wind} meter per second
                        </p>
                        }
                    </>
                    : <p className={style.noData}>No data available</p>
                }
            </div>
            <div className={style.addBtn} onClick={() => dispatch(saveCity(weatherState.weatherData.city))}>+</div>
        </section>
    )
}

export default TopSection