import serversReducer from '../Reducers/serverList';
import {SET_SERVERS} from '../Actions/serversList';

describe('server list reducer', () => {
    it('should return the initial state', () => {
        expect(serversReducer(undefined, {})).toEqual({
                servers: []
            }
        )
    });

    it('should handle SET_SERVERS action', () => {
        expect(serversReducer({}, {
            type: SET_SERVERS,
            servers: [{}, {}]
        })).toEqual({
                servers: [{}, {}]
            }
        )
    });
});