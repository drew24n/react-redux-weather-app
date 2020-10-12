import React, {useEffect} from 'react';
import {TopSection} from "../common/TopSection/TopSection";
import {useDispatch} from "react-redux";
import {setPortionsAmount} from "../../../redux/weatherReducer";
import {OneDay} from "../common/OneDay/OneDay";

export function Today({history}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPortionsAmount(6))
    }, [dispatch])

    return (
        <div>
            <TopSection/>
            <OneDay history={history}/>
        </div>
    )
}