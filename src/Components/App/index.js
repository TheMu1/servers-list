import React from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory as browserHistory} from 'history';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../Reducers';
import Login from '../Login';
import ListPage from '../List';
import PageNotFound from '../PageNotFound';

export default class App extends React.Component {
    render() {
        let token = localStorage.getItem('token');
        const initialState = {
            loginReducer: token ? {token: token} : {token: null}
        };
        const store = createStore(rootReducer, initialState);

        return (
            <Router history={browserHistory()}>
                <Provider store={store}>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/" render={() => (
                            localStorage.getItem('token') ? <ListPage/> : <Redirect to={{pathname: '/login'}}/>
                        )}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Provider>
            </Router>
        )
    }
}
