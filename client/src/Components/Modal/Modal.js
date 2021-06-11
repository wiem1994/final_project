import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Modal.css";
import { addCart, current } from "../../Redux/actions/user";

function ModalButton({ item }) {
    const user = useSelector((state) => state.userReducer.user);
    const error = useSelector((state) => state.userReducer.errors);
    const isAuth = useSelector((state) => state.userReducer.isAuth);

    var cart = {
        title: item.title,
        image: item.image,
        description: item.description,
        category: item.category,
        price: item.price,
        id: item._id,
        quantity: 1,
        totalCart: item.totalCart,
        initialPrice: item.initialPrice,
        total: item.total,
    };

    // cart = JSON.stringify(cart);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    return (
        <>
            {/* {useDispatch(getUser(user._id))} */}
            {isAuth ? (
                <Button
                    id="modal_c_i"
                    variant="primary"
                    onClick={() => {
                        handleShow();

                        if (error === 500) {
                            console.log("err", error);

                            return alert("item is already in cart ");
                        }
                        if (error !== 500) {
                            dispatch(addCart(user._id, cart));
                        }
                    }}
                >
                    <span id="p_modal">ADD TO CART </span>
                </Button>
            ) : null}

            <Modal
                style={{ backgroundColor: "transparent" }}
                show={show}
                onHide={handleClose}
            >
                <Modal.Footer
                    style={{
                        backgroundColor: "#f5f5f5c2",
                        borderColor: "#f5f5f5c2",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Button
                        id="cont_but"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        CONTINUE SHOPPING
                    </Button>
                    <Link to={`/cart/${user._id}`}>
                        <Button
                            id="check_out_but"
                            variant="primary"
                            // onClick={handleClose}
                            onClick={() => {
                                setShow(false);
                                dispatch(current());
                            }}
                        >
                            CHECK OUT
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalButton;
