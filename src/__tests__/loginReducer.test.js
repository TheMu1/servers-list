import loginReducer from '../Reducers/login';
import {LOGIN_REQUEST, LOGOUT} from '../Actions/login';

describe('login reducer', () => {
    it('should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual({
                token: null
            }
        )
    });

    it('should handle LOGIN_REQUEST', () => {
        expect(
            loginReducer({}, {
                type: LOGIN_REQUEST,
                token: 'token'
            })
        ).toEqual({
                token: 'token'
            }
        )
    });

    it('should handle LOGOUT', () => {
        expect(
            loginReducer({}, {
                type: LOGOUT,
                token: null
            })
        ).toEqual({
                token: null
            }
        )
    });
});