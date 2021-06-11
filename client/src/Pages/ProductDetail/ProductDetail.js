import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateItem from "../../Components/UpdateItem/UpdateItem";
import { deleteItem, getItem } from "../../Redux/actions/item";
import "./ProductDetail.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { addComment, current, getComment } from "../../Redux/actions/user";
import CommentList from "../../Components/CommentList/CommentList";

function ProductDetail({ history, match }) {
    const user = useSelector((state) => state.userReducer.user);
    const item = useSelector((state) => state.itemReducer.item);
    const isAuth = useSelector((state) => state.userReducer.isAuth);

    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(deleteItem(item._id, history));
    };

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        dispatch(getItem(match.params.id));
        dispatch(current());
        dispatch(getComment(user._id, infoCom));
        // eslint-disable-next-line
    }, []);
    var today = new Date(),
        date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
    var infoCom = {
        comment,
        id: item._id,
        name: user.name,
        idUser: user._id,
        date,
    };
    return (
        <div>
            {user && user.userType ? (
                <div id="pro_duct_first_part">
                    <Button
                        id="det_ail"
                        variant="primary"
                        onClick={handleClick}
                    >
                        <span id="sp_an_pro">Delete Product</span>
                    </Button>

                    <UpdateItem itemGotten={item} />
                </div>
            ) : null}
            <div className="g_global_part">
                <img src={item.image} alt="error_img" />
                <div className="s_e_c">
                    <h3>{item.title}</h3>
                    <p style={{ padding: "20px 40px" }}>{item.description}</p>

                    <h3>
                        {item.price}
                        <span>$</span>
                    </h3>

                    <hr />
                </div>
            </div>
            <div>
                {!isAuth ? null : (
                    <div>
                        <h3 id="com_ents" id="tit_pro_detail">
                            Comment our product please, your feedback will help
                            us to improve our services.
                        </h3>
                        <input
                            id="com_in_put"
                            placeholder="Write a comment here..."
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <br />
                        <Button
                            id="but_com_sub"
                            variant="primary"
                            onClick={() => {
                                dispatch(addComment(infoCom, user._id));
                                refreshPage();
                            }}
                        >
                            <span id="sp_h_j">Post your comment</span>
                        </Button>
                        <CommentList />{" "}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
