import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // your API URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.accessToken; // assuming you store it in Redux state

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/user'
    })
  })
});

export const { useGetUserQuery } = api;
