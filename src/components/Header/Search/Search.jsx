import React, {useEffect} from 'react';
import style from './Search.module.scss';
import places from 'places.js';
import {useDispatch} from "react-redux";
import {setSearchCity} from "../../../redux/weatherReducer";
import {createHashHistory} from 'history';

export function Search() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fixedOptions = {
            appId: 'plCTYKM9X45Q',
            apiKey: '6fc5c209a0ca763e250a15b19b9267f9',
            container: document.getElementById('searchInput')
        }

        const reconfigurableOptions = {
            language: 'en',
            type: 'city'
        }

        const placesAutocomplete = places(fixedOptions).configure(reconfigurableOptions)

        placesAutocomplete.on('change', e => {
            createHashHistory().push({search: `?city=${e.suggestion.name}`})
            dispatch(setSearchCity(e.suggestion.name))
        })
    }, [dispatch])

    return (
        <div className={style.container}>
            <input id={'searchInput'} placeholder="Find city..."/>
        </div>
    )
}