import React from 'react';
import style from './AddCity.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {saveCity} from "../../../../redux/weatherReducer";

export function AddCity({location}) {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    return (
        <div className={style.container}>
            <div className={style.info}>
                {weatherState.weatherData.city
                    ? <>
                        <p>{weatherState.weatherData.days[0].temp} °C</p>
                        <p className={style.address}>{weatherState.weatherData.city}, {weatherState.weatherData.country}</p>
                        {location && location.pathname === "/" &&
                        <p className={style.weather}>{weatherState.weatherData.days[0].weather}, Wind
                            - {weatherState.weatherData.days[0].wind} meter per second</p>
                        }
                    </>
                    : <p className={style.noData}>No data available</p>
                }
            </div>
            <div className={style.addBtn} onClick={() => dispatch(saveCity(weatherState.weatherData.city))}>+</div>
        </div>
    )
}