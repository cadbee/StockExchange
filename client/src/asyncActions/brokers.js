import {addALLBrokerAction} from "../store/brokerReducer";

export const fetchBrokers = () =>{
    return function(dispatch){
        fetch('https://stock-exchange-00lx.onrender.com/admin').then(response => response.json()).then(json=> dispatch(addALLBrokerAction(json.partners)));
    }
}