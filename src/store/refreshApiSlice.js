import { apiSlice } from "../api/apiSlice";

export const refreshApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refresh: builder.mutation({
            query: credentials => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useRefreshMutation } = refreshApiSlice;