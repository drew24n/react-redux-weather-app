import React, {memo, useEffect, useRef} from 'react';
import style from './Search.module.scss';
import places from 'places.js';
import {useDispatch} from "react-redux";
import {setSearchCity} from "../../../redux/weatherReducer";

function Search({history}) {
    const dispatch = useDispatch()
    const searchInput = useRef()

    useEffect(() => {
        const fixedOptions = {
            appId: 'plCTYKM9X45Q',
            apiKey: '6fc5c209a0ca763e250a15b19b9267f9',
            container: searchInput.current
        }

        const reconfigurableOptions = {
            language: 'en',
            type: 'city'
        }

        const placesAutocomplete = places(fixedOptions).configure(reconfigurableOptions)

        placesAutocomplete.on('change', e => {
            history.push({search: `?city=${e.suggestion.name}`})
            dispatch(setSearchCity(e.suggestion.name))
        })
    }, [dispatch, history])

    return (
        <div className={style.container}>
            <label>
                <input ref={searchInput} placeholder="Find city..."/>
            </label>
        </div>
    )
}

export default memo(Search)