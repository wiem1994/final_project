import React, { useEffect } from "react";

import { current, getfavoriteItem, getUser } from "../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import FavoriteCartCard from "../../Components/FavoriteCartCard/FavoriteCartCard";
function FavoriteCartList({ match }) {
    const user = useSelector((state) => state.userReducer.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current());
        // dispatch(getfavoriteItem(match.params.id));
    }, []);
    return !user || !user.favoriteItem ? (
        <h1>loading</h1>
    ) : (
        <div>
            {user &&
                user.favoriteItem.map((item, index) => (
                    <FavoriteCartCard item={item} key={index} />
                ))}
        </div>
    );
}

export default FavoriteCartList;
