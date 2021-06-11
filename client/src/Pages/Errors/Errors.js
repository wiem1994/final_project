import React from "react";
import "./Errors.css";
import { Link } from "react-router-dom";

var Errors = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <div className="rest">
                    <h2>404 - Page not found</h2>
                    <p>
                        The page you are looking for might have been removed had
                        its name changed or is temporarily unavailable.
                    </p>
                    <Link to="/">
                        <p className="home">Go To Homepage</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Errors;
