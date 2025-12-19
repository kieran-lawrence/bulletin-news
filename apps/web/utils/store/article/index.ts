import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article } from '@repo/api'
import { CreateArticleProps } from '../../types'

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
        postArticle: builder.mutation<Article, CreateArticleProps>({
            query: (article) => ({
                url: '/',
                method: 'POST',
                body: article,
            }),
        }),
    }),
})

export const {
    useGetArticleByIdQuery,
    useGetArticlesQuery,
    useGetArticlesByCategoryQuery,
    useGetArticlesByFlagQuery,
    usePostArticleMutation,
} = articleApi

export interface PaginationParams {
    page?: number
    page_size?: number
}
export interface GetArticleByCategoryParams extends PaginationParams {
    category: string
}
export interface GetArticleByFlagParams extends PaginationParams {
    flag: string
}
