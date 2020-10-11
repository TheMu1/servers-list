import {connect} from 'react-redux';
import LogoutBtn from './logoutBtn';
import {LOGOUT} from "../../Actions/login";

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => {dispatch({type: LOGOUT, token: null})}
    }
};

export default connect(null, mapDispatchToProps)(LogoutBtn);