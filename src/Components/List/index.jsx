import {connect} from 'react-redux';
import ListPage from './listPage';
import {SET_SERVERS} from "../../Actions/serversList";

const mapStateToProps = ({loginReducer, serversReducer}) => {
    return {
        token: loginReducer.token,
        servers: serversReducer.servers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setServers: (servers) => {dispatch({type: SET_SERVERS, servers: servers})}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);