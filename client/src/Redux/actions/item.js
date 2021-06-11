import axios from "axios";
import { FAIL_ITEM, GET_ITEMS, LOAD_ITEM, GET_ITEM } from "../constants/item";

//get all items
export const getItems = () => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        const result = await axios.get("/api/item");

        dispatch({ type: GET_ITEMS, payload: result.data.items });
    } catch (error) {
        dispatch({ type: FAIL_ITEM, payload: error.response });
    }
};

// get an iteam by id
export const getItem = (id) => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        const result = await axios.get(`/api/item/${id}`);
        dispatch({ type: GET_ITEM, payload: result.data.item });
    } catch (error) {
        console.log("err", error);
        dispatch({ type: FAIL_ITEM, payload: error.response.data.errors });
    }
};

//add item
export const addItem = (item) => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        let result = await axios.post("/api/item", item);
        dispatch(getItems());
    } catch (error) {
        dispatch({ type: FAIL_ITEM, payload: error.response });
    }
};

//update item
export const updateItem = (id, item) => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        await axios.put(`/api/item/${id}`, item);
        dispatch(getItem(id));
    } catch (error) {
        dispatch({ type: FAIL_ITEM, payload: error.response.data.errors });
    }
};

//delete item
export const deleteItem = (id, history) => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        await axios.delete(`/api/item/${id}`);
        history.push("/products");
    } catch (error) {
        dispatch({ type: FAIL_ITEM, payload: error.response.data.errors });
    }
};

//get filtered items
export const filteredItems = (input) => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        const result = await axios.get("/api/item/products", {
            headers: { input: input },
        });

        dispatch({ type: GET_ITEMS, payload: result.data.items });
    } catch (error) {
        dispatch({ type: FAIL_ITEM, payload: error.response });
    }
};

//update rate
export const updateRate = (id, rate) => async (dispatch) => {
    dispatch({ type: LOAD_ITEM });
    try {
        await axios.put(`/api/item/rate/${id}`, rate);
        dispatch(getItem(id));
    } catch (error) {
        console.log("err", error);
        dispatch({ type: FAIL_ITEM, payload: error.response.data.errors });
    }
};
