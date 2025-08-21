// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

// 1️⃣ Define the baseQuery with headers
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;

    console.log({token})

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// 2️⃣ Create the main API instance
export const api = createApi({
  reducerPath: "api",   // unique key in the store
  baseQuery: rawBaseQuery,
  endpoints: () => ({}), // will inject endpoints later
});


