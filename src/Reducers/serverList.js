import {SET_SERVERS} from '../Actions/serversList';

export default function servers(state = {
    servers: []
}, action) {
    switch (action.type) {
        case SET_SERVERS:
            return {...state, servers: action.servers};
        default:
            return state;
    }
}