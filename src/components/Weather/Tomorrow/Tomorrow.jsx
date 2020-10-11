import React, {useEffect} from 'react';
import {AddCity} from "../common/AddCity/AddCity";
import {useDispatch} from "react-redux";
import {setDaysAmount, setSearchType} from "../../../redux/weatherReducer";
import {DayInfo} from "../common/DayInfo/DayInfo";

export function Tomorrow({history}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchType('forecast'))
        dispatch(setDaysAmount(1))
    }, [dispatch])

    return (
        <div>
            <AddCity/>
            <DayInfo history={history}/>
        </div>
    )
}