import React from 'react';
import PropTypes from 'prop-types';
import {api} from '../../api.cfg';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'tesonet',
            password: 'partyanimal',
            loading: false,
            error: ''
        };
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    handleUserNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    handleLoginClick = () => {
        if (this.state.username && this.state.password) {
            this.login();
        } else {
            this.setState({
                error: 'Username or/and password field are empty.'
            });
        }
    };

    login = () => {
        this.setState({
            loading: true
        });
        return fetch(api.auth, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(response => {
                return response.json()
            })
            .then(resp => {
                if (resp && resp.token) {
                    this.setState({
                        loading: false,
                        error: ''
                    });
                    localStorage.setItem('token', resp.token);
                    this.props.loginRequest(resp.token);
                    this.props.history.push('/');
                } else {
                    this.setState({
                        loading: false,
                        error: 'Username or password is incorrect.'
                    });
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: 'Something gone wrong please try again later.'
                });
            })
    };

    render() {
        let loading = this.state.loading ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Login';
        let error = <br/>;
        let inputErrr = '';
        if (this.state.error) {
            error =
                <div className="custom-error-msg center-text">
                    <p> {this.state.error} </p>
                </div>
            inputErrr = 'input-error';
        }
        return (
            <div className="login-bg">
                <div className="login-page-container">
                    <div className="login-page-card">
                        <h1 className="custom-login-h">Login</h1>
                        <label className="custom-label"><b>Username:</b> </label> <br/>
                        <input className={`custom-input ${inputErrr}`}
                               type="text" placeholder="Enter Username"
                               name="uname"
                               required
                               onChange={this.handleUserNameChange}
                               value={this.state.username}
                        />
                        <label className="custom-label"><b>Password:</b> </label> <br/>
                        <input className={`custom-input ${inputErrr}`}
                               type="password"
                               placeholder="Enter Password"
                               name="upassword"
                               required
                               onChange={this.handlePasswordChange}
                               value={this.state.password}
                        /> <br/>
                        {error}
                        <button className="login-btn" type="submit" onClick={this.handleLoginClick}>
                            {loading}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    loginRequest: PropTypes.func
};