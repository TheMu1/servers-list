import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class LogoutBtn extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.props.logoutRequest;
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <div className="btn-logout" onClick={this.handleLogout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>Logout
                </div>
            </div>
        )
    }
}

LogoutBtn.propTypes = {
    logoutRequest: PropTypes.func
};

export default withRouter(LogoutBtn);