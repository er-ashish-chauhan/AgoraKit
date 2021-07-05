import React from "react";
import menuReducers from "./menuReducers";
import { combineReducers } from "redux";

const appReducer = combineReducers({
    menu: menuReducers
})

export default appReducer;