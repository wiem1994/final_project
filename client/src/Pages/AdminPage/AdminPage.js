import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../Components/UserCard/UserCard";
import { AllUsers } from "../../Redux/actions/user";

function AdminPage() {
    const users = useSelector((state) => state.userReducer.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AllUsers());
    }, []);

    return !users ? (
        <h1>loading</h1>
    ) : (
        <div>
            {users.map((user, index) => (
                <UserCard user={user} key={index} />
            ))}
        </div>
    );
}

export default AdminPage;
