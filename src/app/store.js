import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/query";
import apiSlice from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice.js";

const logger = createLogger();

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
});

setupListeners(store.dispatch);

export default store;
