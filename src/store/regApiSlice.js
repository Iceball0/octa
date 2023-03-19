import { apiSlice } from "../api/apiSlice";

export const regApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        reg: builder.mutation({
            query: credentials => ({
                url: '/auth/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useRegMutation } = regApiSlice;