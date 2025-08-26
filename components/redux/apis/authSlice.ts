import { UserDataInterface } from "@components/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { authApi } from "./auth";

export const NavInit = [
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Login", path: "/auth/login" },
  { name: "Signup", path: "/auth/register" },
];

export const NavUsers = [
  { name: "Blog", path: "/blog" },
  { name: "Tweet", path: "/tweet" },
  { name: "About", path: "/about" },
  { name: "Account", path: "/account" },
];

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLogin: false,
  isPageLoading: true,
  data: {} as UserDataInterface,
  navbarState: NavInit,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
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
      state.navbarState = NavInit;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.refreshToken.matchPending, (state) => {
      state.isPageLoading = true;
    });

    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.data = payload.credentials as UserDataInterface;
        state.isLogin = true;
        state.isPageLoading = false;
        state.navbarState = NavUsers;
        console.log("✅ Login stored in authSlice");
      }
    ),
     builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {

        console.log("login payload",payload);

        state.accessToken = payload.accessToken;
        state.data = payload.credentials as UserDataInterface;
        state.isLogin = true;
        state.isPageLoading = false;
        state.navbarState = NavUsers;
        console.log("✅ Login stored in authSlice");
      }
    ),
      builder.addMatcher(
        authApi.endpoints.refreshToken.matchRejected,
        (state) => {
          state.isPageLoading = false; // ❌ no token
          state.isLogin = false;
        }
      );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};
