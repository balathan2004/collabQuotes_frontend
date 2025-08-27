// api/authApi.ts
import { register } from 'module';
import {api} from '../api'
import { AuthResponseConfig, ResponseConfig } from "@components/interfaces";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseConfig, { email: string; password: string }>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<AuthResponseConfig, { email: string; password: string }>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.query<AuthResponseConfig, void>({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
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

export const { useLoginMutation, useRefreshTokenQuery,useLogoutMutation } = authApi;
