import { GET_TRANS,GET_TRAN } from '../actions/types';

const initialState = {
        transaction: null,
        transactions: null
}

export default function(state = initialState, action){  
    switch (action.type){
        case(GET_TRANS):
            return(                
                {
                ...state,
                transactions:action.payload
            })
        case(GET_TRAN):
            return(                
                {
                ...state,
                transaction:action.payload
            })
        default:
            return state
    }
}