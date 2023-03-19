import { apiSlice } from "../api/apiSlice";

export const subsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        subscribes: builder.mutation({
            query: credentials => ({
                url: '/subscribes',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useSubscribesMutation } = subsApiSlice;