import React, {Component, useState} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './styles/app.css'
import './styles/w3.css'
import {Admin} from "./components/admin";

import Stocks from "./components/chart/stocks";
import styles from "./styles/sidenav.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {navData} from "./navData";
import {Settings} from "./components/tables/settings";


export function App() {
    const [open, setopen] = useState(true);
    const toggleOpen = () => {
        setopen(!open);
    }
    return (
        <div className="App">
            <div className={open?styles.sidenav:styles.sidenavClosed}>
                <button className={styles.menuBtn} onClick={toggleOpen}>
                    {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
                </button>
                {navData.map(item =>{
                    return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                        {item.icon}
                        <span className={open?styles.linkText:styles.linkTextClosed}>{item.text}</span>
                    </NavLink>
                })}
            </div>
            <main className={open?"main_cont":"main_cont_hide"}>
                <Routes>
                    <Route  path="/" element={<Admin />}/>
                    <Route path="/stocks" element={<Stocks />}/>
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </main>
        </div>

    );
}
export default App;
