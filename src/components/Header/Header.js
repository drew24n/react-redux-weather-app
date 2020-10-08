import React from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Search} from "./Search/Search";

export function Header() {
    return (
        <header className={style.container}>
            <div className={style.leftSection}>
                <NavLink activeClassName={style.active} exact to={'/today'}>Today</NavLink>
                <NavLink activeClassName={style.active} exact to={'/tomorrow'}>Tomorrow</NavLink>
                <NavLink activeClassName={style.active} exact to={'/week'}>Week</NavLink>
            </div>
            <div className={style.rightSection}>
                <Search/>
            </div>
        </header>
    )
}