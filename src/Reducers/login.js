import {LOGIN_REQUEST, LOGOUT} from '../Actions/login';

export default function login(state = {
    token: null
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, token: action.token};
        case LOGOUT:
            return {...state, token: action.token};
        default:
            return state;
    }
}