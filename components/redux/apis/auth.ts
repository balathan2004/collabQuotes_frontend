// api/authApi.ts
import { register } from "module";
import { api } from "../api";
import { AuthResponseConfig, ResponseConfig } from "@components/interfaces";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.mutation<
      AuthResponseConfig,
      { refreshToken: string }
    >({
      query: (payload) => {
        return {
          url: `auth/refresh`,
          method: "POST",
          body: payload,
        };
      },
    }),
    logout: builder.mutation<ResponseConfig, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false, // keep other endpoints safe
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
  authApi;
