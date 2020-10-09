import {combineReducers} from "redux";
import loginReducer from './login';
import serversReducer from './serverList';

export default combineReducers({
    loginReducer,
    serversReducer
})