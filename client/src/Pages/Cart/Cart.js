import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import CartCard from "../../Components/CartCard/CartCard";
import { getUser } from "../../Redux/actions/user";
import { useEffect } from "react";
import ValidCommand from "../../Components/ValidCommand/ValidCommand";

function Cart({ match }) {
    var cart = useSelector((state) => state.userReducer.user.cart);
    var user = useSelector((state) => state.userReducer.user);
    const [BigTotal, setBigTotal] = useState();

    const dispatch = useDispatch();
    let x = 0;
    useEffect(() => {
        dispatch(getUser(match.params.id));
        if (cart) {
            cart.forEach((el) => {
                x = x + el.price;
            });
        }
        setBigTotal(x);
    }, [cart]);
    console.log(BigTotal);

    return !cart || !user ? (
        <h1>loading</h1>
    ) : (
        <div>
            <h3
                style={{
                    marginTop: "30px",
                    textAlign: "left",
                    marginLeft: "10px",
                    marginBottom: "50px",
                }}
            >
                CART SUMMARY
            </h3>
            <h1 id="to_tal">
                Total cart is {BigTotal} <span>$</span>
            </h1>

            {cart.map((item, index) => (
                <CartCard
                    item={item}
                    key={index}
                    changeTotal={setBigTotal}
                    totalprop={BigTotal}
                />
            ))}

            <ValidCommand BigTotal={BigTotal} />
        </div>
    );
}

export default Cart;
