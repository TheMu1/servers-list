import {connect} from 'react-redux';
import LogoutBtn from './logoutBtn';
import {LOGOUT} from "../../Actions/login";

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: (token) => {dispatch({type: LOGOUT, token: token})}
    }
};

export default connect(null, mapDispatchToProps)(LogoutBtn);