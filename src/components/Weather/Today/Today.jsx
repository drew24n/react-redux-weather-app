import React, {memo, useEffect} from 'react';
import TopSection from "../../common/TopSection/TopSection";
import {useDispatch, useSelector} from "react-redux";
import {setPortionsAmount} from "../../../redux/weatherReducer";
import OneDay from "../../common/OneDay/OneDay";
import Preloader from "../../common/Preloader/Preloader";

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
            <OneDay history={history}/>
        </main>
    )
}

export default memo(Today)