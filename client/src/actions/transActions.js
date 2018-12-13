import {GET_TRANS,GET_ERRORS,GET_TRAN} from './types';
import axios from 'axios';

export const getTransactions = () => dispatch => {
    
    axios.get('/api/transactions/current')
    .then((res)=>{
        dispatch({
            type:GET_TRANS,
            payload:res.data
        })
    })
}

export const getAllTransactions = () => dispatch => {
    
    axios.get('/api/transactions/all')
    .then((res)=>{
        dispatch({
            type:GET_TRANS,
            payload:res.data
        })
    })
}

export const submitRequest = (transData, history) => dispatch => {
    axios.post('/api/transactions/',transData)
    .then((res => history.push('/dashboard')))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}

export const deleteTransaction = id => dispatch => {

    axios.delete(`/api/transactions/${id}`)
    .then( (res) => {
        axios.get('/api/transactions/current')
            .then((res)=>{
                dispatch({
                    type:GET_TRANS,
                    payload:res.data
                })
        })
    })
}

export const getTransaction = id => dispatch => {
    console.log("getTranscation")
    axios.get(`/api/transactions/${id}`)
    .then(res => {
        dispatch({
            type: GET_TRAN,
            payload: res.data
        }   
        )
    })
    .catch( err => 
        console.log(err)
    )
}

export const updateTrans = (id, data, history) =>{
    
}