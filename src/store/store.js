import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import userReducer from "../features/users/userSlice";

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
const store = configureStore({
    reducer: {
      user: userReducer,
      ["Puppyapi"]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
export default store;
