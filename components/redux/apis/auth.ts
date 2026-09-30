// api/authApi.ts

import { api } from "../api";
import { AuthResponseConfig } from "@components/interfaces";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: { data: payload },
      }),
    }),
    register: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: { data: payload },
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
          body: { data: payload },
        };
      },
    }),

  }),
  overrideExisting: false, // keep other endpoints safe
});

export const { useLoginMutation, useRefreshTokenMutation } =
  authApi;
