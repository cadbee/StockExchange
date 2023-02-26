import React, {Component, useEffect, useState} from 'react';
import Stock from './stock'
import '../../styles/stocks.css'
import Select from "react-select";
import {chart_data, chart_options} from "./chartSetup";
const names = ["APPL", "AMD", "CSCO", "AMZN", "MSFT", "QCOM", "TSLA", "SBUX"]
const options = [
    {value: 'APPL', label: 'APPL'},
    {value: 'AMZN', label: 'AMZN'},
    {value: 'QCOM', label: 'QCOM'},
    {value: 'AMD', label: 'AMD'},
    {value: 'CSCO', label: 'CSCO'},
    {value: 'MSFT', label: 'MSFT'},
    {value: 'SBUX', label: 'SBUX'},
    {value: 'TSLA', label: 'TSLA'},
];
const options_period = [
    {value: 1, label: "2Y"},
    {value: 2, label: '1Y'},
    {value: 24, label: '1M'},
];
export default function Stocks() {
    const [stock_name, setCurrentFruit] = useState('APPL')
    const [period, setPeriod] = useState(24)

    const changeFruit = (newFruit) => {
        chart_options.plugins.title = {text: newFruit.value, display: true}
        setCurrentFruit(newFruit);
    }
    const changePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    }

    return (
        <>

            <div className={"stocks_container"}>
                <div className="selects-cont">
                <Select defaultValue={stock_name} options={options} value={stock_name} onChange={changeFruit}/>
                <Select defaultValue={period} options={options_period} value={period} onChange={changePeriod}/>
                </div>
                <Stock period={period.value} name={stock_name.value} names={names}/>
            </div>
        </>
    );

}