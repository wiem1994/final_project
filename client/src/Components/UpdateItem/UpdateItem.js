import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { updateItem, getItem } from "../../Redux/actions/item";
import "./UpdateItem.css";

function UpdateItem({ itemGotten }) {
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});
    const editItem = useSelector((state) => state.itemReducer.item);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
        dispatch(getItem(itemGotten._id));
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateItem(itemGotten._id, item));
        handleClose();
    };
    useEffect(() => {
        dispatch(getItem(item._id));
        setItem(editItem);
    }, [editItem]);

    return (
        <>
            <Button id="b_x_upd" variant="primary" onClick={handleShow}>
                <span id="modf_upd">Update Product</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update the current Product...</Modal.Title>
                </Modal.Header>
                <Modal.Body className="inputArea">
                    <Form.Control
                        type="text"
                        value={item.image}
                        onChange={(e) => setItem({ image: e.target.value })}
                    />
                    <Form.Control
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                            setItem({
                                ...item,
                                title: e.target.value,
                            })
                        }
                    />
                    <Form.Control
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                            setItem({
                                ...item,
                                description: e.target.value,
                            })
                        }
                    />
                    <Form.Control
                        type="text"
                        value={item.category}
                        onChange={(e) =>
                            setItem({ ...item, category: e.target.value })
                        }
                    />
                    <Form.Control
                        type="text"
                        value={item.price}
                        // value={itemGotten.price}
                        onChange={(e) =>
                            setItem({
                                ...item,
                                price: e.target.value,
                            })
                        }
                    />

                    <Form.Control
                        type="text"
                        value={item.initialPrice}
                        onChange={(e) =>
                            setItem({
                                ...item,
                                initialPrice: e.target.value,
                            })
                        }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateItem;
