import React, { useState, useEffect } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/registration-form-4.jpg";
import { register, videErrors } from "../../Redux/actions/user";
import { Link } from "react-router-dom";
import Error from "../../Components/Error/Error";

const Register = ({ history }) => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.userReducer.errors);

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(user, history));
    };

    useEffect(() => {
        return () => {
            dispatch(videErrors());
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className="wrapper">
            <div className="inner">
                <div className="image-holder">
                    {errors.length > 0
                        ? errors.map((el, index) => (
                              <Error error={el} key={index} />
                          ))
                        : null}
                    <img
                        src={image}
                        alt="not_found"
                        style={{
                            width: "90%",
                            marginBottom: "40px",
                        }}
                    />
                </div>
                <form action="">
                    <h3>Sign Up</h3>
                    <div className="form-holder active">
                        <input
                            type="text"
                            placeholder="name"
                            className="form-control"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    name: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-holder">
                        <input
                            type="text"
                            placeholder="e-mail"
                            className="form-control"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    email: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-holder">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            style={{ fontSize: "15px" }}
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    password: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-holder">
                        <input
                            type="number"
                            placeholder="Phone Number"
                            className="form-control"
                            style={{ fontSize: "15px" }}
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    phoneNumber: event.target.value,
                                });
                            }}
                        />
                    </div>

                    <button
                        className="butt"
                        type="submit"
                        onClick={handleRegister}
                        style={{ margin: "0 auto" }}
                    >
                        Sign up
                    </button>
                    <div>
                        <p style={{ marginTop: "20px", color: "black" }}>
                            Already Have account?{" "}
                        </p>

                        <Link className="login" to="/login">
                            <span className="login">Login</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
