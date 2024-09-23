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
        getAccount: builder.mutation<User, string>({
            query: (accessToken: string) => ({
                url: `/account`,
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
        postRegister: builder.mutation<User, RegisterParams>({
            query: (registerParams) => ({
                url: `/register`,
                method: 'POST',
                body: registerParams,
            }),
        }),
    }),
})

export const {
    usePostLoginMutation,
    useGetAccountMutation,
    usePostRegisterMutation,
} = authApi

interface LoginParams {
    email: string
    password: string
}
interface RegisterParams {
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    password: string
}
