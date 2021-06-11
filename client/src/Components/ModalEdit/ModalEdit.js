import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ModalEdit.css";
import {Modal,Button,Form} from "react-bootstrap"

function ModalButton() {
    const user = useSelector((state) => state.userReducer.user);

    const [edit, setEdit] = useState({});


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    function refreshPage() {
        window.location.reload(false);
    }
    return (
        <div>

            <Button
                id="modal_c_i"
                variant="primary"
                onClick={() => {
                    handleShow();
                    dispatch(getUser(user._id));
                }}
            >
                <span id="p_modal">Edit profile </span>
            </Button>

            <Modal
                style={{ backgroundColor: "transparent" }}
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Product...</Modal.Title>
                </Modal.Header>

                <Modal.Body className="inputArea">
                    <Form.Control
                        type="text"
                        placeholder="Enter Image..."
                        onChange={(e) =>
                            setEdit({ ...edit, name: e.target.value })
                        }
                    />
                      <Form.Control
                        type="text"
                        placeholder="Enter Image..."
                        onChange={(e) =>
                            setEdit({ ...edit, phone: e.target.value })
                        }
                    />
                    <Modal.Body />
                <Modal.Footer
                    style={{
                        backgroundColor: "#f5f5f5c2",
                        borderColor: "#f5f5f5c2",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Button
                        style={{
                            fontWeight: "bolder",
                            width: "40%",
                            height: "40%",
                            backgroundColor: "#ef5f96",
                            borderColor: "transparent",
                        }}
                        variant="secondary"
                        onClick={()=>{ dispatch(editProfile(user._id, edit));
                            refreshPage();handleClose}}
                       
                    >
                       Cancel
                    </Button>
                    <Link to="/profile">
                        <Button
                            style={{
                                fontWeight: "bolder",
                                width: "40%",
                                backgroundColor: "#ef5f96",
                                maxHeight: "max-content",
                                height: "60px",
                                borderColor: "transparent",
                            }}
                            variant="primary"
                         
                            onClick={() => {
                                setShow(false);
                                dispatch(current());
                            }}
                        >
                            Save changes
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        <div/>
    );
}

export default ModalButton;
