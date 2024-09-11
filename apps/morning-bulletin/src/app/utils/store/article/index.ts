import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article } from '../../types'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/article' }),
    endpoints: (builder) => ({
        getArticles: builder.query<Article[], PaginationParams>({
            query: ({ page = 1, page_size = 10 }) =>
                `/?page_size=${page_size}&page=${page}`,
        }),
        getArticleById: builder.query<Article, string>({
            query: (id) => `/${id}`,
        }),
        getArticlesByCategory: builder.query<
            Article[],
            GetArticleByCategoryParams
        >({
            query: ({ category, page = 1, page_size = 10 }) =>
                `/category/${category}?page_size=${page_size}&page=${page}`,
        }),
        getArticlesByFlag: builder.query<Article[], GetArticleByFlagParams>({
            query: ({ flag, page = 1, page_size = 10 }) =>
                `/flag/${flag}?page_size=${page_size}&page=${page}`,
        }),
    }),
})

export const {
    useGetArticleByIdQuery,
    useGetArticlesQuery,
    useGetArticlesByCategoryQuery,
    useGetArticlesByFlagQuery,
} = articleApi

interface PaginationParams {
    page?: number
    page_size?: number
}
interface GetArticleByCategoryParams extends PaginationParams {
    category: string
}
interface GetArticleByFlagParams extends PaginationParams {
    flag: string
}
