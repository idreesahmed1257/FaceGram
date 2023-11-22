import { createStore } from "redux";
import allReducers from "../combinedReducer/index";

export const store = createStore(allReducers);
