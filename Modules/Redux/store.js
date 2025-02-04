import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const storeX = configureStore({
    reducer: rootReducer
});

export default storeX;
