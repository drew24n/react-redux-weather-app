import React, {useEffect} from 'react';
import TopSection from "../components/TopSection";
import {useDispatch, useSelector} from "react-redux";
import {setPortionsAmount} from "../redux/weather";
import DayInfo from "../components/DayInfo";
import Preloader from "../components/Preloader";

function Today({history}) {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        dispatch(setPortionsAmount(8))
    }, [dispatch])

    if (weatherState.isFetching) return <Preloader/>

    return (
        <main>
            <TopSection/>
            <DayInfo history={history}/>
        </main>
    )
}

export default Today