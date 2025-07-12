import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    Comment as CommentType,
    CreateCommentDto,
    CreateCommentReplyDto,
} from '../../types'
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:6688/comments',
    }),
    endpoints: (builder) => ({
        getCommentsByArticleId: builder.query<CommentType[], number>({
            query: (articleId) => ({
                url: `/${articleId}`,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        getCommentsCount: builder.query<{ count: number }, number>({
            query: (articleId) => ({
                url: `http://localhost:6688/articles/${articleId}/count`,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        postComment: builder.mutation<CommentType, CreateCommentDto>({
            query: (comment) => ({
                url: '/',
                method: 'POST',
                body: comment,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        postCommentReply: builder.mutation<CommentType, CreateCommentReplyDto>({
            query: ({ commentId, ...reply }) => ({
                url: `${commentId}/reply`,
                method: 'POST',
                body: reply,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
    }),
})
export const {
    useGetCommentsByArticleIdQuery,
    useGetCommentsCountQuery,
    usePostCommentMutation,
    usePostCommentReplyMutation,
} = commentApi
