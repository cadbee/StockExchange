const defaultState = {
    stock: [],
    stocks: [],
}
const DEL_STOCK = "DEL_STOCK";
const ADD_STOCK = "ADD_STOCK";
const ADD_ALL_STOCKS = "ADD_ALL_STOCKS";
export const stockReducer = (state=defaultState, action) => {
    switch (action.type){
        case ADD_ALL_STOCKS:
            return {...state, stock: [...action.stock]}
        case ADD_STOCK:
            return {...state, stocks: [...state.stocks, {name: action.stock.name, data: action.stock.stock}]};
        case DEL_STOCK:
            return {...state, ...state.brokers.filter(stock=>stock === action.stock)};
        default:
            return state;
    }
}
export const addStockAction = (stock)=>({type:ADD_STOCK, stock});
export const delStockAction = (stock)=>({type:DEL_STOCK, stock});
export const addALLStocksAction = (stock)=>({type:ADD_ALL_STOCKS, stock});