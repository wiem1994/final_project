import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../../Components/OrderCard/OrderCard";
import OrderCardAdmin from "../../Components/OrderCard/OrderCardAdmin";
import { current, AllUsers } from "../../Redux/actions/user";

import "./OrderPage.css";

function OrderPageAdmin() {
    var users = useSelector((state) => state.userReducer.users);
    var user = useSelector((state) => state.userReducer.user);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current());
        dispatch(AllUsers());
    }, []);

    return !users || !user ? (
        <h1>loading</h1>
    ) : (
        <div>
            <input
                placeholder="Search here for details..."
                type="text"
                id="admin_se"
                onChange={(e) => {
                    setSearchName(e.target.value);
                    setSearchEmail(e.target.value);
                }}
            />

            <div id="com_card_val">
                <h3
                    style={{
                        marginTop: "30px",
                        textAlign: "left",
                        marginLeft: "10px",
                        marginBottom: "50px",
                    }}
                >
                    ORDER SUMMARY
                </h3>
                <h5>Command is validated</h5>
                <h1 id="to_tal"></h1>
                {users
                    .filter(
                        (el) =>
                            el.name
                                .toLowerCase()
                                .includes(searchName.toLowerCase()) ||
                            el.email
                                .toLowerCase()
                                .includes(searchEmail.toLowerCase())
                    )
                    .map(
                        (user) =>
                            user &&
                            user.order.map((order, index) => (
                                <OrderCardAdmin
                                    user={user}
                                    order={order}
                                    key={index}
                                />
                            ))
                    )}
            </div>
        </div>
    );
}
export default OrderPageAdmin;
