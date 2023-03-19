import { apiSlice } from "../api/apiSlice";

export const videosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        videos: builder.mutation({
            query: credentials => ({
                url: '/videos',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useVideosMutation } = videosApiSlice;