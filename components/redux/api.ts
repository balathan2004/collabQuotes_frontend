// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

 const url="https://collab-quotes-server.vercel.app/"
// const url="http://localhost:3000/"


// 1️⃣ Define the baseQuery with headers
const rawBaseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;


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


