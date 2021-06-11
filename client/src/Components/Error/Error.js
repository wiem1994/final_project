import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

const Error = ({ error }) => {
    const [alert, setAlert] = useState(true);
    // const errors = useSelector((state) => state.userReducer.errors);

    useEffect(() => {
        // when the component is mounted, the alert is displayed for 3 seconds
        setTimeout(() => {
            setAlert(!alert);
        }, 3000);
        // eslint-disable-next-line
    }, []);
    return (
        alert && (
            <div class="alert alert-primary" role="alert">
                {error.msg}
            </div>
        )
    );
};

export default Error;
