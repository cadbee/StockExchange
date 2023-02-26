const defaultState = {
    brokers: [],
}
const ADD_BROKER = "ADD_BROKER";
const DEL_BROKER = "DEL_BROKER";
const ADD_ALL_BROKERS = "ADD_ALL_BROKERS";
export const brokerReducer = (state=defaultState, action) => {
    switch (action.type){
        case ADD_ALL_BROKERS:
            return {...state, brokers: [...action.brokers]}
        case ADD_BROKER:
            return {...state, brokers: [...state.brokers, action.broker]};
        case DEL_BROKER:
            return {...state, ...state.brokers.filter(broker=>broker === action.broker)};
        default:
            return state;
    }
}

export const addBrokerAction = (broker)=>({type:ADD_BROKER, broker});
export const delBrokerAction = (broker)=>({type:DEL_BROKER, broker});
export const addALLBrokerAction = (brokers)=>({type:ADD_ALL_BROKERS, brokers});