import React from 'react';
import LogoutBtn from '../Logout';
import PropTypes from 'prop-types';
import Table from "rc-table";
import {api} from "../../api.cfg";

export default class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            sort: {
                column: '',
                direction: 'desc',
            },
        };
    }

    componentDidMount() {
        this.getServersList();
    }

    getServersList = () => {
        fetch(api.servers, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
        })
            .then(response => {
                if(response.status === 401){
                   this.logout();
                } else {
                    return response.json()
                }
            })
            .then(resp => {
                if (resp && resp.length > 0) {
                    this.sortServers('distance', resp);
                    this.setState({
                        loading: false
                    });
                } else {
                    this.setState({
                        loading: false,
                        error: 'Some error occurred while fetching servers list. Please try again later.'
                    });
                }
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: 'Some error occurred while fetching servers list. Please try again later.'
                });
            })
    };

    logout = () => {
        localStorage.removeItem('token');
        this.props.logoutRequest();
        this.props.history.push('/login');
    };

    sortServers = (column, servers) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'asc';
        const sortedData = servers.sort((a, b) => {
            if (column === 'name') {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else {
                return a.distance - b.distance;
            }
        });

        if (direction === 'desc') {
            sortedData.reverse();
        }
        this.props.setServers(sortedData);
        this.setState({
            sort: {
                column,
                direction,
            }
        });
    };

    onHeaderCellClick = (key) => ({
        onClick: () => {
            this.sortServers(key, this.props.servers);
        }
    });

    render() {
        let table;
        let error;
        let distanceSort = '';
        let serverSort = '';
        let sortDirection = this.state.sort.direction;

        if (this.state.sort.column === 'distance') {
            distanceSort = sortDirection === 'desc' ? 'th bottom' : 'th top';
        }
        if (this.state.sort.column === 'name') {
            serverSort = sortDirection === 'desc' ? 'th bottom' : 'th top';
        }
        const columns = [
            {
                className: serverSort,
                title: <div className="list-table-title">Server name</div>,
                dataIndex: 'name',
                onHeaderCell: () => this.onHeaderCellClick('name')
            },
            {
                className: distanceSort,
                title: <div className="list-table-title">Distance</div>,
                dataIndex: 'distance',
                onHeaderCell: () => this.onHeaderCellClick('distance'),
                render: (value, row) => {
                    return <div className="distance-col">{row.distance} (km) </div>
                }
            }
        ];
        if (!this.state.loading) {
            table =
                <Table columns={columns} data={this.props.servers} rowKey={(row) => {
                    return row.name + row.distance
                }}/>
        } else {
            table =
                <div className="loader">
                    <i className="fa fa-circle-o-notch fa-5x fa-spin loader"></i>
                </div>
        }
        if (this.state.error) {
            error =
                <div className="custom-error-msg text-align-center">
                    <p> {this.state.error} </p>
                </div>
        }

        return (
            <div className="list-container">
                <LogoutBtn/> <br/>
                <h1 className="list-header">Servers list</h1>
                {error}
                {table}
            </div>
        )
    }
}

ListPage.propTypes = {
    token: PropTypes.string,
    servers: PropTypes.array,
    setServers: PropTypes.func
};