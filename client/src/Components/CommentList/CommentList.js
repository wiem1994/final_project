import React, { useEffect } from "react";
import Comment from "../Comments/Comment";
import { useSelector, useDispatch } from "react-redux";
import { AllUsers } from "../../Redux/actions/user";
import "./CommentList.css";
function CommentList() {
    const users = useSelector((state) => state.userReducer.users);
    const comments = useSelector((state) => state.userReducer.user.infoCom);
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AllUsers());
    }, []);

    return !user || !comments ? (
        <h1>loading</h1>
    ) : (
        <div id="f_l_bl">
            <h1 id="tit_le_com">User reviews</h1>
            {users.map(
                (person) =>
                    person &&
                    person.infoCom.map((infoCom, index) => (
                        <Comment user={user} infoCom={infoCom} key={index} />
                    ))
            )}
        </div>
    );
}

export default CommentList;
