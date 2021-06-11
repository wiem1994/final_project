import { combineReducers } from "redux";
import itemReducer from "./item";
import userReducer from "./user";

const rootReducer = combineReducers({ userReducer, itemReducer });
export default rootReducer;
