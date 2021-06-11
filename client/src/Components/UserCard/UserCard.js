import React from "react";
import { Table, Button } from "react-bootstrap";
import { getUser, removeUser } from "../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./UserCard.css";
function UserCard({ user }) {
    const dispatch = useDispatch();

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        removeUser(user._id),
                                        refreshPage()
                                    );
                                }}
                            >
                                <span id="del_user_but"> Remove user</span>
                            </Button>
                        </td>
                        <td>{user && user.name}</td>
                        <td>{user && user.email}</td>
                        <td>{user && user.phone}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default UserCard;
