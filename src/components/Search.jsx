import React, {useEffect, useRef} from 'react';
import style from '../styles/Search.module.scss';
import places from 'places.js';
import {useDispatch} from "react-redux";
import {setSearchCity} from "../redux/weather";

function Search({history}) {
    const dispatch = useDispatch()
    const searchInput = useRef()

    useEffect(() => {
        const fixedOptions = {
            appId: process.env.REACT_APP_MAP_APP_ID,
            apiKey: process.env.REACT_APP_MAP_APP_API_KEY,
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

export default Search