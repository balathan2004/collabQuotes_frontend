// api/authApi.ts
import { api } from "../api";
import { PostResponseConfig } from "../../interfaces";
import queryString from "query-string";

export const blogApi = api
  .enhanceEndpoints({ addTagTypes: ["profile"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBlog: builder.query<PostResponseConfig, any>({
        query: (payload) => {
          const queryParams = queryString.stringify(payload);
          return({
            url: `public/get_posts?${queryParams}`,
            method: "GET",
          });
        },
        providesTags: ["profile"],
      }),
    }),
    overrideExisting: false, // keep other endpoints safe
  });

export const { useLazyGetBlogQuery } = blogApi;
