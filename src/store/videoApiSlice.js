import { apiSlice } from "../api/apiSlice";

export const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        video: builder.mutation({
            query: credentials => ({
                url: '/video',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useVideoMutation } = videoApiSlice;