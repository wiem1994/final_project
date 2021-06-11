import React from "react";
import "./log.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login, videErrors } from "../../Redux/actions/user";
import { Link } from "react-router-dom";
import Error from "../../Components/Error/Error";

const Login = ({ history }) => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.userReducer.errors);
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(user, history));
    };

    useEffect(() => {
        return () => {
            dispatch(videErrors());
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div id="wrap">
            {/* {errors.length > 0
                ? errors.map((el, index) => <Error error={el} key={index} />)
                : null} */}
            <form
                className="full"
                style={{ marginTop: "60px" }}
                onSubmit={handleLogin}
            >
                <div style={{ paddingBottom: "550px", paddingLeft: "100px" }}>
                    <h1 id="log_login_c">Login</h1>
                    <div style={{ marginTop: "30px" }}>
                        <h6 className="title_login">Email</h6>
                        <input
                            style={{ marginTop: "15px" }}
                            id="i_n"
                            type="text"
                            required
                            placeholder="enter your email..."
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <h6
                            className="title_login"
                            style={{ marginTop: "25px" }}
                        >
                            Password
                        </h6>
                        <input
                            id="i_n_1"
                            style={{ marginTop: "15px" }}
                            type="password"
                            required
                            placeholder="enter your password..."
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                });
                            }}
                        />
                        <br />
                        <div style={{ marginTop: "20px" }}>
                            <button id="little_log_login" onClick={handleLogin}>
                                LOGIN
                            </button>

                            <p style={{ marginTop: "20px" }}>
                                Don't have an account yet ?{" "}
                                <Link className="sign" to="/register">
                                    <span className="title_login">SIGN UP</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Login;
