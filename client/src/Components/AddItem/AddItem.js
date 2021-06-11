import React, { useState } from "react";
import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../Redux/actions/item";
import "./AddItem.css";

function AddItem() {
    const user = useSelector((state) => state.userReducer.user);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [item, setItem] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(addItem(item));
        handleClose();
    };

    return (
        <section>
            {user && user.userType ? (
                <div>
                    <Button
                        id="add_item_component_button-1"
                        variant="primary"
                        onClick={handleShow}
                    >
                        <p id="this_is_for_decoration">Add Product</p>
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a New Product...</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="inputArea">
                            <Form.Control
                                type="text"
                                placeholder="Enter Image..."
                                onChange={(e) =>
                                    setItem({ ...item, image: e.target.value })
                                }
                            />
                            <Form.Control
                                type="text"
                                placeholder="Enter Title..."
                                onChange={(e) =>
                                    setItem({
                                        ...item,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="text"
                                placeholder="Enter Description..."
                                onChange={(e) =>
                                    setItem({
                                        ...item,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Category"
                            >
                                <Dropdown.Item
                                    onClick={() =>
                                        setItem({ ...item, category: "face" })
                                    }
                                >
                                    Face
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>
                                        setItem({ ...item, category: "eye" })
                                    }
                                >
                                    Eye
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>
                                        setItem({ ...item, category: "lip" })
                                    }
                                >
                                    Lip
                                </Dropdown.Item>
                            </DropdownButton>

                            <Form.Control
                                type="text"
                                placeholder="Enter ¨Price..."
                                onChange={(e) =>
                                    setItem({
                                        ...item,
                                        price: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="text"
                                placeholder="Enter initial Price..."
                                onChange={(e) =>
                                    setItem({
                                        ...item,
                                        initialPrice: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="text"
                                placeholder="Enter total Price as initial price and we will calculate later..."
                                onChange={(e) =>
                                    setItem({
                                        ...item,
                                        total: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="text"
                                placeholder="Enter total Price as inital price and we will calculate later..."
                                onChange={(e) =>
                                    setItem({
                                        ...item,
                                        totalCart: e.target.value,
                                    })
                                }
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Add Product
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) : null}
        </section>
    );
}

export default AddItem;
