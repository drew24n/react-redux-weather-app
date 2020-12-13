import React, {useEffect} from 'react';
import style from '../styles/Default.module.scss';
import TopSection from "../components/TopSection";
import {useDispatch, useSelector} from "react-redux";
import {removeCity, setPortionsAmount, setSearchCity} from "../redux/weather";
import Preloader from "../components/Preloader";

function Default({history}) {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        if (!weatherState.searchPortions) {
            dispatch(setPortionsAmount(8))
        }
        document.title = 'Weather'
    }, [dispatch, weatherState.searchPortions])

    if (weatherState.isFetching) return <Preloader/>

    return (
        <div className={style.container}>
            <TopSection history={history}/>
            <h3>Saved cities</h3>
            {!weatherState.savedCities.length && <p className={style.msg}>Save cities for easier navigation!</p>}
            <div className={style.citiesContainer}>
                {weatherState.savedCities.map((city, index) => {
                    return (
                        <div className={style.cityItem} key={index}
                             onClick={() => {
                                 dispatch(setSearchCity(city))
                                 history.push(`/today?city=${city}`)
                             }}
                        >
                            <div className={style.closeBtn}
                                 onClick={e => {
                                     e.stopPropagation()
                                     dispatch(removeCity(city))
                                 }}
                            >✕
                            </div>
                            <p>{city}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Default