import {connect} from "react-redux";
import LoginPage from "./loginPage";
import {LOGIN_REQUEST} from "../../Actions/login";

const mapStateToProps = ({loginReducer}) => {
  return {
      login: loginReducer.token
  }
};

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (token) => {dispatch({type: LOGIN_REQUEST, token: token})}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);