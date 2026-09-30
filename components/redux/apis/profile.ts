// api/authApi.ts
import { api } from "../api";
import { DataRes, ListRes, Quotes, QuotesWithProfile, User } from "../../interfaces";

export const profileApi = api
  .enhanceEndpoints({ addTagTypes: ["profile"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserProfile: builder.query<DataRes<User>, void>({
        query: () => ({
          url: "profile/my_profile",
          method: "GET",
        }),
        providesTags: ["profile"],
      }),
      getMyQuotes: builder.query<ListRes<Quotes>, { page: number, limit: number }>({
        query: ({ page, limit }) => ({
          url: `profile/my_quotes?page=${page}&limit=${limit}`,
          method: "GET",
        }),
        providesTags: ["profile"],
      }),
      getUserProfileById: builder.query<DataRes<User>, string>({
        query: (id) => ({
          url: `public/get_profile/${id}`,
          method: "GET",
        }),
      }),

      getProfilePosts: builder.query<ListRes<QuotesWithProfile>, { userId: string, page: number, limit: number }>({
        query: ({ userId, page, limit }) => ({
          url: `public/get_profile_posts/${userId}?page=${page}&limit=${limit}`,
          method: "GET",
        }),
      }),


    }),
    overrideExisting: false, // keep other endpoints safe
  });

export const { useGetUserProfileQuery, useLazyGetMyQuotesQuery, useGetUserProfileByIdQuery, useLazyGetProfilePostsQuery } = profileApi;
