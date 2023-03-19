import { apiSlice } from "../api/apiSlice";

export const likesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        likes: builder.mutation({
            query: credentials => ({
                url: '/likes',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useLikesMutation } = likesApiSlice;