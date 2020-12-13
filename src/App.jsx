import React, {lazy, useEffect} from 'react';
import style from './styles/App.module.scss';
import Header from "./components/Header";
import {Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCity, getWeather, setSavedCities, setSearchCity} from "./redux/weather";
import Default from "./pages/Default";
import {localStorageService} from "./localStorageService";
import {withSuspense} from "./hoc/withSuspense";
import {useHistory} from 'react-router-dom';
import * as queryString from "query-string";

const Today = lazy(() => import(`./pages/Today`))
const Tomorrow = lazy(() => import(`./pages/Tomorrow`))
const Week = lazy(() => import(`./pages/Week`))

export function App() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    const history = useHistory()
    const {city} = queryString.parse(history.location.search)

    useEffect(() => {
        if (city) {
            dispatch(setSearchCity(city))
        } else {
            dispatch(getCity())
        }
    }, [dispatch, city])

    useEffect(() => {
        if (weatherState.searchCity && weatherState.searchPortions) {
            dispatch(getWeather({
                city: weatherState.searchCity,
                portions: weatherState.searchPortions
            }))
        }
    }, [dispatch, weatherState.searchCity, weatherState.searchPortions])

    useEffect(() => {
        const savedCities = localStorageService.getCities()
        if (savedCities && savedCities.length) {
            dispatch(setSavedCities(JSON.parse(savedCities)))
        }
    }, [dispatch])

    return (
        <div className={style.container}>
            <Header city={weatherState.searchCity} history={history}/>
            <Switch>
                <Route exact path={'/'} component={Default}/>
                <Route path={'/today'} render={withSuspense(Today)}/>
                <Route path={'/tomorrow'} render={withSuspense(Tomorrow)}/>
                <Route path={'/week'} render={withSuspense(Week)}/>
            </Switch>
        </div>
    )
}