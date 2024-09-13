import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { User } from '../../types'

interface NestJSError {
    status: number
    data?: {
        message?: string
        statusCode?: number
    }
}
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/auth',
    }) as BaseQueryFn<string | FetchArgs, unknown, NestJSError>,
    endpoints: (builder) => ({
        getAuthStatus: builder.mutation<User, string>({
            query: (accessToken: string) => ({
                url: `/status`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
        postLogin: builder.mutation<{ access_token: string }, LoginParams>({
            query: (loginParams) => ({
                url: `/login`,
                method: 'POST',
                body: loginParams,
            }),
        }),
    }),
})

export const { useGetAuthStatusMutation, usePostLoginMutation } = authApi

interface LoginParams {
    email: string
    password: string
}
