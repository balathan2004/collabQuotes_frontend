import { UserDataInterface } from "@components/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {authApi} from './auth'

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLogin: false,
  data: {} as UserDataInterface,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state,{payload})  => {
      state.accessToken = payload.accessToken;
     // state.refreshToken = payload.refreshToken;
      state.data = payload.credentials;
      state.isLogin = true;
      console.log("done store values");
    },
    logout: (state) => {
      state.accessToken = "";
     // state.refreshToken = null;
      state.data = {} as UserDataInterface;
      state.isLogin = false;
    },
  },
  extraReducers:(builder)=>{
    builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled,(state,{payload})=>{

        state.accessToken = payload.accessToken;
        state.data = payload.credentials as UserDataInterface;
        state.isLogin = true;
        console.log("✅ Login stored in authSlice");

    })
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;


export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};