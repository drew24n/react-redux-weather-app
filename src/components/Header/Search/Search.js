import React from 'react';
import style from './Search.module.scss';
import AlgoliaPlaces from 'algolia-places-react';

export function Search() {
    return (
        <div className={style.container}>
            <AlgoliaPlaces
                placeholder='Find city...'
                options={{
                    appId: 'plCTYKM9X45Q',
                    apiKey: '6fc5c209a0ca763e250a15b19b9267f9',
                    language: 'en',
                    type: 'city'
                }}
                onChange={e => {}}
                onClear={e => {}}
               />
        </div>
    )
}