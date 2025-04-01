import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUserId = (state) => state.user.user.user_id;

export const getToken = (state) => state.user.token;

export default userSlice.reducer;
