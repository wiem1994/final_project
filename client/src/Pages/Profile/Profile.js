import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Profile.css";
import { Button } from "react-bootstrap";
import { editProfile } from "../../Redux/actions/user";
import { Link } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.userReducer.user);
    const isAuth = useSelector((state) => state.userReducer.isAuth);

    const [edit, setEdit] = useState({});
    const dispatch = useDispatch();
    function refreshPage() {
        window.location.reload(false);
    }
    return (
        <div className="profile">
            {isAuth ? (
                <div>
                    <div className="row">
                        <div className="col-lg-7 mx-auto text-white text-center pt-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-md-6 col-sm-10 mx-auto">
                            <div className="bg-white shadow rounded overflow-hidden cont">
                                <div id="back_r_pro">
                                    <div className="media align-items-end profile-header ">
                                        <div className="profile mr-3">
                                            <img
                                                src="https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg"
                                                alt="..."
                                                width={130}
                                                className="rounded mb-2 img-thumbnail"
                                                id="im_pro"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="py-4 px-4">
                                    <h5 className="mb-0">
                                        Profile information
                                    </h5>
                                    <br />
                                    <h5>{user && user.name}</h5>
                                    <h5>{user && user.email}</h5>
                                    <h5>{user && user.phone}</h5>
                                    <Link to={`/order/${user._id}`}>
                                        <h5 className="mb-0">
                                            Check your commands
                                        </h5>
                                    </Link>
                                    <h5 className="mb-0">Edit your profile</h5>

                                    <div id="part_pro">
                                        <input
                                            placeholder="Enter new name..."
                                            onChange={(e) =>
                                                setEdit({
                                                    ...edit,
                                                    name: e.target.value,
                                                })
                                            }
                                            id=" mb-2"
                                        ></input>
                                        <input
                                            placeholder="Enter new phone number..."
                                            id=" mb-3"
                                            onChange={(e) =>
                                                setEdit({
                                                    ...edit,
                                                    phone: e.target.value,
                                                })
                                            }
                                        ></input>
                                    </div>
                                    <br />
                                    <Button
                                        id="b_pro_ile"
                                        onClick={() => {
                                            dispatch(
                                                editProfile(user._id, edit)
                                            );
                                            refreshPage();
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                </div>
            ) : null}
        </div>
    );
};

export default Profile;
