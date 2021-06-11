import {
    CURRENT_USER,
    FAIL_USER,
    GET_USER,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    VIDE_ERRORS,
    UPDATE_CART,
    POST_COMMENT,
    GET_COMMENTS,
    DELETE_COMMENT,
    GET_WISHCART,
    REMOVE_WISHCART,
    UPDATE_ORDER,
    GET_USERS,
} from "../constants/user";

//initial state
const initialState = {
    users: [],
    user: {},
    load: false,
    isAuth: false,
    errors: [],
    cart: [],
    favoriteItem: [],
    order: [],
};

//pure function
const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_USER:
            return { ...state, load: true };
        case REGISTER_USER:
            //payload has msg,user,token
            localStorage.setItem("token", payload.token);
            return { ...state, load: false, isAuth: true, user: payload.user };
        case LOGIN_USER:
            localStorage.setItem("token", payload.token);
            return { ...state, load: false, isAuth: true, user: payload.user };
        case FAIL_USER:
            //payload has only the errors
            return { ...state, load: false, errors: payload };
        case CURRENT_USER:
            return { ...state, user: payload.user, isAuth: true };
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return { ...state, user: {}, isAuth: false };
        case VIDE_ERRORS:
            return { ...state, errors: [] };
        case UPDATE_CART:
            return {
                ...state,
                cart: [...state.cart, payload],
            };
        case GET_USER:
            return {
                ...state,
                load: false,
                user: payload,
            };
        case POST_COMMENT:
            return { ...state, infoCom: [...state.infoCom, payload] };
        case GET_COMMENTS:
            return {
                ...state,
                load: false,
                infoCom: [...state.infoCom, payload.infoCom],
            };
        case DELETE_COMMENT:
            return { ...state, infoCom: [...state.infoCom, payload.infoCom] };
        case REMOVE_WISHCART:
            return {
                ...state,
                favoriteItem: [...state.favoriteItem, payload.favoriteItem],
            };
        case GET_WISHCART:
            return {
                ...state,
                favoriteItem: [...state.favoriteItem, payload.favoriteItem],
            };
        case UPDATE_ORDER:
            return {
                ...state,
                cart: [],
                order: [...state.order, payload.order],
            };
        case GET_USERS:
            return { ...state, load: false, users: payload.users };
        default:
            return state;
    }
};

export default userReducer;
