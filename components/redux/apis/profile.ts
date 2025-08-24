// api/authApi.ts
import { api } from "../api";
import { ProfileResponseCofig } from "../../interfaces";

export const profileApi = api
  .enhanceEndpoints({ addTagTypes: ["profile"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserQuotes: builder.query<ProfileResponseCofig, void>({
        query: () => ({
          url: "profile/my_profile",
          method: "GET",
        }),
        providesTags: ["profile"],
      }),
    }),
    overrideExisting: false, // keep other endpoints safe
  });

export const { useGetUserQuotesQuery } = profileApi;
