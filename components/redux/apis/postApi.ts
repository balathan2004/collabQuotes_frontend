// api/authApi.ts
import { api } from "../api";
import { ResponseConfig } from "../../interfaces";

export const postApi = api
  .enhanceEndpoints({ addTagTypes: ["profile"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBlogPosts: builder.query<
        ResponseConfig,
        { page: number; limit: number }
      >({
        query: ({ page, limit }) => ({
          url: `get_posts?page=${page}&limit=${limit}`,
          method: "GET",
        }),
      }),

      createPost: builder.mutation<
        ResponseConfig,
        { username: string; author: string; quote: string }
      >({
        query: (payload) => ({
          url: "posts",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["profile"],
      }),

      deletePost: builder.mutation<ResponseConfig, { postId: string }>({
        query: ({ postId }) => ({
          url: `posts?postId=${postId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["profile"],
      }),

      editPost: builder.mutation<
        ResponseConfig,
        { userId: string; postId: string }
      >({
        query: (payload) => ({
          url: "posts",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["profile"],
      }),
    }),
    overrideExisting: false, // keep other endpoints safe
  });

export const { useDeletePostMutation, useCreatePostMutation } = postApi;
