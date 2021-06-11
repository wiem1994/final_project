import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AllUsers } from "../../Redux/actions/user";

import "./OrderCard.css";

function OrderCardAdmin({ order, user }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AllUsers());
    }, []);

    return (
        <div className="row border-top border-bottom" id="order_card_admin">
            <div className="row main align-items-center">
                <div className="col-2">
                    <img
                        className="img-fluid"
                        src={order.image}
                        alt="err_img"
                    />
                </div>
                <div className="col">
                    <div className="row text-muted">{order.title}</div>
                </div>
                <div className="col">
                    <div className="row text-muted">{order.quantity}</div>
                </div>
                <div className="col">
                    <div className="row text-muted">
                        <span>Confirmed on : </span>
                        {order.date}
                    </div>
                </div>
                <div className="col">
                    <h3>
                        {" "}
                        Total : {order.price}
                        <span>$</span>
                    </h3>
                    <span>Passed by : {user.name}</span>
                    <br />
                    <span>Identifier : {user._id}</span>
                    <br />
                    <span>Email : {user.email}</span>
                    <br />
                    <span>Phone Number : {user.phone}</span>
                    <br />
                    <span>Registered on : {user.date}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderCardAdmin;
