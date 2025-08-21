// api/authApi.ts
import {api} from '../api'
import {QuoteInterface} from '../../interfaces'


export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    getUserQuotes: builder.query<QuoteInterface[], void>({
      query: () => ({
        url: "profile/my_profile",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false, // keep other endpoints safe
});

export const {  useGetUserQuotesQuery } = profileApi;
