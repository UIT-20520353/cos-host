import { createAction, createReducer } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.type";

const initialState: IUser = {
  id: "",
  name: ""
};

export const userLogin = createAction<IUser>("user/login");
export const userLogout = createAction<IUser>("user/logout");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(userLogin, (state, action) => {
    const date = action.payload;
    state.id = date.id;
    state.name = date.name;
  });
  builder.addCase(userLogout, (state) => {
    (state.id = ""), (state.name = "");
  });
});

export default userReducer;
