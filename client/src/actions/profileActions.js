import {GET_PROFILE} from './types'
import Axios from 'axios';

export const getProfile = () => dispatch => {
    Axios.get('/api/profiles')
    .then(res => {
        
        dispatch(
            {
                type:GET_PROFILE,
                payload: res.data
            }
        )
    })
}

export const setProfile = (default_add) => dispatch => {
    Axios.post('/api/profiles', {default_address: default_add})
    .then(res => {
        dispatch(
            {
                type:GET_PROFILE,
                payload: res.data
            }
        )
    })
}