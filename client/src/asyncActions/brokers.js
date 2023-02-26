import {addALLBrokerAction} from "../store/brokerReducer";

export const fetchBrokers = () =>{
    return function(dispatch){
        fetch('https://stock-exchange-8of7.onrender.com/admin').then(response => response.json()).then(json=> dispatch(addALLBrokerAction(json.partners)));
    }
}