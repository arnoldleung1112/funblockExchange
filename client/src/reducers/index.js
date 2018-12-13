
import { combineReducers } from 'redux';
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import transReducer from './transReducer'
import profileReducer from './profileReducer'
export default combineReducers(
{auth:authReducer,
errors: errorReducer,
transaction: transReducer,
profile: profileReducer}
)