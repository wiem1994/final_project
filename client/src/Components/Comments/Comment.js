import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AllUsers,
    current,
    deleteComment,
    deleteComments,
    getUser,
} from "../../Redux/actions/user";
import { Button } from "react-bootstrap";

function Comment({ infoCom }) {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    const com = {
        comment: infoCom.comment,
        id: infoCom.id,
    };
    function refreshPage() {
        window.location.reload(false);
    }
    useEffect(() => {
        dispatch(current());
        dispatch(AllUsers());
    }, []);
    return (
        <div className="h_r_com">
            <hr className="h_r_com" />

            <p style={{ color: "black" }}>{infoCom.comment}</p>
            <p>
                Published on : <span>{infoCom.date}</span>
            </p>
            <p>Added by : {infoCom.name}</p>
            {user && !user.userType ? (
                <Button
                    id="del_but"
                    onClick={() => {
                        dispatch(deleteComment(user._id, com));
                        refreshPage();
                    }}
                >
                    Delete
                </Button>
            ) : null}
            {user.userType ? (
                <Button
                    id="admin_user_del"
                    onClick={() => {
                        dispatch(deleteComments(infoCom.idUser, infoCom));
                        refreshPage();
                    }}
                >
                    Report
                </Button>
            ) : null}

            <hr className="h_r_com" />
        </div>
    );
}

export default Comment;
