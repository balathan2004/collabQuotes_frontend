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
      getProfileById: builder.query<ProfileResponseCofig, string>({
        query: (id) => ({
          url: `public/get_profile/${id}`,
          method: "GET",
        }),
      }),
    }),
    overrideExisting: false, // keep other endpoints safe
  });

export const { useGetUserQuotesQuery,useGetProfileByIdQuery } = profileApi;
