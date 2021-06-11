import {
    FAIL_USER,
    LOAD_USER,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    CURRENT_USER,
    VIDE_ERRORS,
    UPDATE_CART,
    POST_COMMENT,
    GET_COMMENTS,
    DELETE_COMMENT,
    REMOVE_WISHCART,
    GET_WISHCART,
    UPDATE_ORDER,
    GET_USERS,
    GET_USER,
} from "../constants/user";
import axios from "axios";

//register
export const register = (user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.post("/api/user/register", user);
        //succees action
        dispatch({ type: REGISTER_USER, payload: result.data }); //{user,token,msg}
        history.push("/profile");
    } catch (error) {
        // fail
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

//login
export const login = (user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.post("/api/user/login", user);
        dispatch({ type: LOGIN_USER, payload: result.data });
        user && user.userType
            ? history.push("products")
            : history.push("/profile");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.data });
    }
};

//current user
export const current = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        let result = await axios.get("/api/user/current", config);
        dispatch({ type: CURRENT_USER, payload: result.data }); //{msg , user}
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//logout
export const logout = () => {
    return {
        type: LOGOUT_USER,
    };
};

export const videErrors = () => {
    return {
        type: VIDE_ERRORS,
    };
};

//add item to cart
export const addCart = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.put(`/api/user/${id}`, item);

        dispatch({ type: UPDATE_CART, payload: result.data.user.cart });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.status });
    }
};

//get user by id == current
export const getUser = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        await axios.get(`/api/user/${id}`);
        // dispatch(getUser(id));
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//add to cart +
export const addItemUser = (cart, id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`/api/user/cart/${id}`, cart);
        dispatch({ type: UPDATE_CART, payload: result.data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

//- from cart
export const MinusItemUser = (cart, id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`/api/user/cartminus/${id}`, cart);
        dispatch({ type: UPDATE_CART, payload: result.data.user });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

//remove item from user
export const removeItemUser = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`/api/user/cart/delete/${id}`, item);
        dispatch({ type: UPDATE_CART, payload: result.data.user });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

//remove user (admin role)
export const removeUser = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.delete(`/api/user/${id}`);
        dispatch({ type: GET_USER, payload: result.data.user });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

//post comment
export const addComment = (com, id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.put(`/api/user/comments/${id}`, com);
        dispatch({ type: POST_COMMENT, payload: result.data.user });
    } catch (error) {
        console.log("err", error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//delete comment
export const deleteComment = (id, com) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.put(`/api/user/comment/${id}`, com);
        dispatch({ type: DELETE_COMMENT, payload: result.data.user });
    } catch (error) {
        console.log("del_err", error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//update profile
export const editProfile = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        await axios.put(`/api/user/profile/${id}`, item);
        dispatch(getUser(id));
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

//get all comments (admin role)
export const getComment = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`/api/user/product/${id}`);
        dispatch({ type: GET_COMMENTS, payload: result.data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//add wish list

export const addWishCart = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.put(`/api/user/favorite/${id}`, item);
        dispatch({ type: GET_WISHCART, payload: result.data.user });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//remove wish list

export const removeWishCart = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.put(`/api/user/favorites/${id}`, item);
        dispatch({ type: REMOVE_WISHCART, payload: result.data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//add order
export const OrderList = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.put(`/api/user//order/${id}`, item);

        dispatch({ type: UPDATE_ORDER, payload: result.data.user });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//get all users (admin role)
export const AllUsers = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.get("/api/user/users");
        dispatch({ type: GET_USERS, payload: result.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//admin deleting user's comment
export const deleteComments = (id, comment) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`/api/user/delete/${id}`, comment);
        dispatch({ type: GET_USERS, payload: result.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};
