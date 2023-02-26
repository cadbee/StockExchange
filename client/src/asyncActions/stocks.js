import {addALLStocksAction, addStockAction} from "../store/stockReducer";

export const fetchStocks = (stock_name) =>{
    return async function (dispatch) {
        await fetch('http://localhost:3333/stocks/' + stock_name).then(response => response.json()).then(json => dispatch(addALLStocksAction(json.stock)));
    }
}
export const fetchAddStocks = (stock_name) =>{
    return async function(dispatch){
        await fetch('http://localhost:3333/stocks/'+stock_name).then(response => response.json()).then(json=> dispatch(addStockAction({name: stock_name, stock: json.stock})));
    }
}