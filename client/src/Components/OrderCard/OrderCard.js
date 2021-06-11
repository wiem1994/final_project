import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { current } from "../../Redux/actions/user";

import "./OrderCard.css";

function OrderCard({ cart }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(current());
    }, []);
    var today = new Date(),
        date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();

    var order = {
        title: cart.title,
        image: cart.image,
        description: cart.description,
        category: cart.category,
        price: cart.price,
        id: cart.id,
        quantity: cart.quantity,
        totalCart: cart.totalCart,
        initialPrice: cart.initialPrice,
        total: cart.total,
        date,
    };
    return (
        <div className="row border-top border-bottom">
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={cart.image} alt="err_img" />
                </div>
                <div className="col">
                    <div className="row text-muted">{cart.title}</div>
                </div>
                <div className="col">
                    <div className="row text-muted">{cart.quantity}</div>
                </div>
                <div className="col">
                    <div className="row text-muted">
                        <span>Confirmed on : </span>
                        {order && order.date}
                    </div>
                </div>
                <div className="col">
                    <h3>
                        {" "}
                        Total : {order && order.price}
                        <span>$</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
