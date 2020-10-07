import React from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Search} from "./Search/Search";

export function Header() {
    return (
        <header className={style.container}>
            <div className={style.leftSection}>
                <NavLink exact to={'/today'}>Today</NavLink>
                <NavLink exact to={'/tomorrow'}>Tomorrow</NavLink>
                <NavLink exact to={'/week'}>Week</NavLink>
            </div>
            <div className={style.rightSection}>
                <Search/>
            </div>
        </header>
    )
}