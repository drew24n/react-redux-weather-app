import React, {useEffect} from 'react';
import style from './Search.module.scss';
import places from 'places.js';
import {useDispatch} from "react-redux";
import {setSearchCity} from "../../../redux/weatherReducer";

export function Search() {
    const dispatch = useDispatch()

    useEffect(() => {
        const placesAutocomplete = places({
            appId: 'plCTYKM9X45Q',
            apiKey: '6fc5c209a0ca763e250a15b19b9267f9',
            container: document.getElementById('searchInput')
        }).configure({
            language: 'en',
            type: 'city'
        })
        placesAutocomplete.on('change', e => dispatch(setSearchCity(e.suggestion.name)))
        placesAutocomplete.on('clear', () => dispatch(setSearchCity('')))
    }, [dispatch])

    return (
        <div className={style.container}>
            <input id={'searchInput'} placeholder="Find city..."/>
        </div>
    )
}