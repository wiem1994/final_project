import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllUsers, getUser, logout } from "../../Redux/actions/user";

const Nav_bar = () => {
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user = useSelector((state) => state.userReducer.user);

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    return (
        <div className="back_ground">
            <ul className="global">
                <ul style={{ listStyleType: "none" }}>
                    {" "}
                    <Link to="/" className="no-underline">
                        <li id="nav_tit_com">MAKE UP FOREVER</li>
                    </Link>
                </ul>

                <div className="list">
                    <Link to="/products" className="no-underline">
                        <li
                            style={{ marginLeft: "10px" }}
                            // onClick={() => {
                            //     dispatch(getItems());
                            // }}
                        >
                            Products
                        </li>
                    </Link>
                    <ul className="sub_list">
                        {isAuth || token ? (
                            <ul className="sub_list">
                                <Link to="/" className="no-underline">
                                    <li
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => {
                                            dispatch(logout());
                                        }}
                                    >
                                        Logout{" "}
                                    </li>
                                </Link>
                                {user && !user.userType ? (
                                    <Link
                                        to="/profile"
                                        className="no-underline"
                                    >
                                        <li style={{ marginLeft: "10px" }}>
                                            Profile{" "}
                                        </li>
                                    </Link>
                                ) : null}
                            </ul>
                        ) : (
                            <ul className="sub_list">
                                <Link to="/register" className="no-underline">
                                    {" "}
                                    <li style={{ marginLeft: "10px" }}>
                                        Register
                                    </li>
                                </Link>
                                <Link to="/login" className="no-underline">
                                    <li
                                        style={{ marginLeft: "10px" }}
                                        onClick={() =>
                                            dispatch(getUser(user._id))
                                        }
                                    >
                                        Login{" "}
                                    </li>
                                </Link>
                            </ul>
                        )}
                    </ul>
                    {isAuth ? (
                        <Link to={`/cart/${user._id}`} className="no-underline">
                            <li style={{ marginLeft: "10px" }}>Cart</li>
                        </Link>
                    ) : null}
                    {user && !user.userType ? (
                        <Link
                            to={`/favorite/${user._id}`}
                            className="no-underline"
                        >
                            <li style={{ marginLeft: "10px" }}>Favorites</li>
                        </Link>
                    ) : null}
                    {user && !user.userType ? (
                        <Link to="/contact" className="no-underline">
                            <li style={{ marginLeft: "10px" }}>Contact us</li>
                        </Link>
                    ) : null}
                </div>
                {user.userType ? (
                    <div id="admin_part_nav">
                        <Link to="/admin">
                            <li onClick={() => dispatch(AllUsers)}>Admin</li>
                        </Link>

                        <Link to="/admin/order">
                            <li onClick={() => dispatch(AllUsers)}>Orders</li>
                        </Link>
                    </div>
                ) : null}
            </ul>
        </div>
    );
};

export default Nav_bar;
