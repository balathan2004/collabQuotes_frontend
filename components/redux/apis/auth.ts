// api/authApi.ts
import {api} from '../api'
import { AuthResponseConfig } from "@components/interfaces";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string; credentials: any }, { email: string; password: string }>({
      query: (body) => ({
        url: "auth/login",
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
  }),
  overrideExisting: false, // keep other endpoints safe
});

export const { useLoginMutation, useRefreshTokenQuery } = authApi;
