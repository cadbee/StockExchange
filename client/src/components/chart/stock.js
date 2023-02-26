import {Line} from "react-chartjs-2";
import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {addBrokerAction, getBrokerAction} from "../../store/brokerReducer";
import {fetchBrokers} from "../../asyncActions/brokers";
import {fetchAddStocks, fetchStocks} from "../../asyncActions/stocks";
import {chart_data, chart_options} from "./chartSetup";
import '../../styles/stocks.css'
import {Chart} from "chart.js";

export default function Stock(props) {
    const {period, name, names} = props;
    const dispatch = useDispatch();
    const [notLoaded, setLoad] = useState(true);
    const stocks_data = useSelector(state => state.stockReducer.stocks);

    useEffect(() => {
        if(notLoaded){
            for(let name of names)
                dispatch(fetchAddStocks(name));
            setLoad(false);
        }
    }, [])
    var stock = [];
    for(let el of stocks_data){
        if(el.name === name){
            stock = el.data;
        }
    }
    let values_open = [];
    let values_close = [];
    let labels = [];
    for (let i = Math.floor((stock.length -1)/period); i >= 0; i--) {
        values_open.push(Number(stock[i]["Open"].replace('$', '')));
        values_close.push(Number(stock[i]["Close/Last"].replace('$', '')));
        labels.push(stock[i]["Date"]);
    }
    chart_data.labels = labels;
    chart_data.datasets[0].data = values_open;
    chart_data.datasets[1].data = values_close;
    return (
        <>
                <>
                    <div className={"stock"}>
                    <Line className={"chart"} data={chart_data}
                          options={chart_options} key={Math.random()}/>
                    </div>
                </>

        </>
    );
}
