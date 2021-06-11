import React, { useState } from "react";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getItem, updateItem } from "../../Redux/actions/item";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import ReactStars from "react-rating-stars-component";
import { addWishCart, getUser } from "../../Redux/actions/user";
import RatingStars from "./RatingStars";

function ProductCard({ item }) {
    const user = useSelector((state) => state.userReducer.user);

    const dispatch = useDispatch();

    var favoriteItem = {
        title: item.title,
        image: item.image,
        price: item.price,
        id: item._id,
    };

    return (
        <div className="container d-flex justify-content-center">
            <figure id="back_ground" className="card card-product-grid card-lg">
                {" "}
                <div id="pro_du_com">
                    <RatingStars item={item} />

                    <Link to={`/favorite/${user._id}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-suit-heart-fill"
                            viewBox="0 0 16 16"
                            style={{
                                marginLeft: "150px",
                                color: "white",

                                cursor: "pointer",
                            }}
                            onClick={() => {
                                dispatch(addWishCart(user._id, favoriteItem));
                                alert(
                                    "The product you have selected has been added to your wish list"
                                );
                            }}
                        >
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                        </svg>
                    </Link>
                </div>
                <Link to={`/products/${item._id}`}>
                    <img
                        id="im_g_product_card"
                        src={item.image}
                        alt="no_image"
                        onClick={() => {
                            dispatch(getItem(item._id));
                        }}
                    />{" "}
                </Link>
                <figcaption className="info-wrap">
                    <div className="row">
                        <div className="col-md-9 col-xs-9">
                            {" "}
                            <h6 id="title_product" data-abc="true">
                                {item.title}
                            </h6>{" "}
                        </div>
                    </div>
                </figcaption>
                <div className="bottom-wrap-payment">
                    <figcaption className="info-wrap">
                        <div className="row">
                            <div className="col-md-9 col-xs-9">
                                {" "}
                                <h2 id="h_3_product">
                                    {item.price}
                                    <span>$</span>
                                </h2>{" "}
                            </div>
                            <div className="col-md-3 col-xs-3"></div>
                        </div>
                    </figcaption>
                </div>
                <div className="bottom-wrap">
                    {" "}
                    <Modal
                        href="#"
                        className="btn btn-primary float-right"
                        data-abc="true"
                        item={item}
                    />
                </div>
            </figure>
        </div>
    );
}

export default ProductCard;
