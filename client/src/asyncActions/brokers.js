import {addALLBrokerAction} from "../store/brokerReducer";

export const fetchBrokers = () =>{
    return function(dispatch){
        fetch('http://localhost:3333/admin').then(response => response.json()).then(json=> dispatch(addALLBrokerAction(json.partners)));
    }
}