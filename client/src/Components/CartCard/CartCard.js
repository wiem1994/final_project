import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addItemUser,
    getUser,
    MinusItemUser,
    removeItemUser,
} from "../../Redux/actions/user";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CartCard.css";
import { getItem } from "../../Redux/actions/item";

function CartCard({ item }) {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    dispatch(getUser(user._id));
    function refreshPage() {
        window.location.reload(false);
    }

    var cart = {
        title: item.title,
        image: item.image,
        description: item.description,
        category: item.category,
        price: item.price,
        id: item.id,
        quantity: 1,
        totalCart: item.totalCart,
        initialPrice: item.initialPrice,
        total: item.total,
    };

    return (
        <div className="row border-top border-bottom">
            <div className="row main align-items-center">
                <div className="col-2">
                    <img
                        className="img-fluid"
                        src={item.image}
                        alt="err_img"
                        onClick={() => dispatch(getItem(item._id))}
                    />
                </div>
                <div className="col">
                    <div className="row text-muted">{item.title}</div>
                    {/* <div className="row">Cotton T-shirt</div> */}
                </div>
                <div className="col">
                    {" "}
                    <Button
                        className="plus_minus_butt"
                        onClick={() => {
                            dispatch(MinusItemUser(cart, user._id));
                            refreshPage();
                        }}
                    >
                        -
                    </Button>
                    <div id="qty_cart">{item.quantity}</div>
                    <Button
                        className="plus_minus_butt"
                        onClick={() => {
                            dispatch(addItemUser(cart, user._id));
                            refreshPage();
                        }}
                    >
                        +
                    </Button>{" "}
                </div>
                <div className="col">
                    <h3>
                        {" "}
                        Total : {cart && cart.price}
                        <span>$</span>
                    </h3>
                </div>
                <div className="col">
                    <Link to={`/cart/${user._id}`}>
                        <Button
                            id="rm_bt"
                            onClick={() => {
                                dispatch(
                                    removeItemUser(user._id, cart),
                                    refreshPage()
                                );
                            }}
                        >
                            Remove
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartCard;
