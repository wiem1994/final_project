import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { current } from "../../Redux/actions/user";

import "./OrderPage.css";

function OrderPage() {
    var user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current());
    }, []);

    return !user.order || !user ? (
        <h1>loading</h1>
    ) : (
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
            <h1 id="to_tal">
                {/* Total cart is {BigTotal} <span>$
            </span> */}
            </h1>
            {user &&
                user.order.map((cart, index) => (
                    <OrderCard cart={cart} key={index} />
                ))}
        </div>
    );
}

export default OrderPage;
