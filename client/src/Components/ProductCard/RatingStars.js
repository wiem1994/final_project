import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateRate } from "../../Redux/actions/item";

import "./RatingStars.css";
function RatingStars({ item }) {
    const [rate, setRate] = useState(0);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch();

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input
                            id="input_stars"
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() =>
                                dispatch(
                                    updateRate(item._id, setRate(ratingValue))
                                )
                            }
                            onMouseOver={() => setHover(ratingValue)}
                            onMouseOut={() => setHover(null)}
                        />
                        <FaStar
                            id="star"
                            color={
                                ratingValue <= (hover || rate)
                                    ? "ffc107"
                                    : "e4e5e9"
                            }
                            size={20}
                        />
                    </label>
                );
            })}
            <p>The rating is {rate}</p>
        </div>
    );
}

export default RatingStars;
