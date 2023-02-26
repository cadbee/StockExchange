import {applyMiddleware, combineReducers, createStore} from "redux";
import {stockReducer} from "./stockReducer";
import {composeWithDevTools} from 'redux-devtools-extension'
import {brokerReducer} from "./brokerReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({stockReducer: stockReducer, brokerReducer: brokerReducer});


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));