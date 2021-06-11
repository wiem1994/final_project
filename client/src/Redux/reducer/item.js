const {
    GET_ITEMS,
    GET_ITEM,
    FAIL_ITEM,
    LOAD_ITEM,
} = require("../constants/item");

const initialState = {
    items: [],
    item: {},
    load: false,
    errors: [],
};

const itemReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_ITEM:
            return { ...state, load: true };
        case GET_ITEMS:
            return { ...state, load: false, items: payload };

        case FAIL_ITEM:
            return { ...state, load: false, errors: payload };
        case GET_ITEM:
            return { ...state, load: false, item: payload };

        default:
            return state;
    }
};

export default itemReducer;
