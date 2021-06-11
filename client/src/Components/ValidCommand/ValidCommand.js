import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ValidCommand.css";
import { getUser, OrderList } from "../../Redux/actions/user";
import { useSelector, useDispatch } from "react-redux";

function ValidCommand({ BigTotal, item }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var user = useSelector((state) => state.userReducer.user);
    var cart = useSelector((state) => state.userReducer.user.cart);

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
    };

    const dispatch = useDispatch();
    let x = 0;
    useEffect(() => {
        dispatch(getUser(user._id));
    }, []);

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div id="val_id_com">
            <Button id="but_valid" variant="primary" onClick={handleShow}>
                <span id="com_v">Valid your command </span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    you will be receiving your command in few days..
                </Modal.Body>
                <Modal.Body>Command n°{uniqid}</Modal.Body>
                <hr />

                <Modal.Body>
                    Order Total : {BigTotal} <span>$</span>
                </Modal.Body>

                <Modal.Body>
                    <h3>Thank you for your order!</h3>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            dispatch(OrderList(user._id, order));
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ValidCommand;
