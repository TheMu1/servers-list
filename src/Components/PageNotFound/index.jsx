import React from "react";
import {Link} from 'react-router-dom';

export default class PageNotFound extends React.Component {

    render() {
        return (
            <div className="notFound-page-container">
                <div>
                    <h1>404. Page not found.</h1>
                    <h2 className="center-text">
                        <Link className="back-btn" to="/"> Go back </Link>
                    </h2>
                </div>
            </div>
        )
    }
}