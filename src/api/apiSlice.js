import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log('sending refresh');

        // sending refresh and getting access tokens
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        console.log(refreshResult);

        if (refreshResult?.data) {
            // store new token
            localStorage.setItem("accessToken", refreshResult.data.accessToken);

            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else { 
            localStorage.removeItem("accessToken");
            await baseQuery('/auth/logout', api, extraOptions);
        }
    } else if (result?.error?.status === 401) {
        if (localStorage.getItem("accessToken"))
            localStorage.removeItem("accessToken");
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});