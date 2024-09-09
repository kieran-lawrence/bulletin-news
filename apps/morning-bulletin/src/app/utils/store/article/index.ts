import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article } from '../../types'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/article' }),
    endpoints: (builder) => ({
        getArticles: builder.query<Article[], string>({
            query: () => `/`,
        }),
        getArticleById: builder.query<Article, string>({
            query: (id) => `/${id}`,
        }),
        getArticlesByCategory: builder.query<Article[], string>({
            query: (category) => `/category/${category}`,
        }),
        getArticlesByFlag: builder.query<Article[], string>({
            query: (flag) => `/flag/${flag}`,
        }),
    }),
})

export const {
    useGetArticleByIdQuery,
    useGetArticlesQuery,
    useGetArticlesByCategoryQuery,
    useGetArticlesByFlagQuery,
} = articleApi
