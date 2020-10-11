import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory as browserHistory} from 'history';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../Reducers';
import Login from '../Login';
import ListPage from '../List';
import PageNotFound from '../PageNotFound';
import PrivateRoute from '../PrivateRoute';

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
                        <PrivateRoute exact path="/" component={ListPage}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Provider>
            </Router>
        )
    }
}
