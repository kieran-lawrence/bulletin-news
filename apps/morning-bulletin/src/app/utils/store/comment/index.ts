import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    Comment as CommentType,
    CreateCommentDto,
    CreateCommentReplyDto,
} from '../../types'
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:6688',
    }),
    endpoints: (builder) => ({
        getCommentsByArticleId: builder.query<CommentType[], number>({
            query: (articleId) => ({
                url: `/comments/${articleId}`,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        getCommentsCount: builder.query<{ count: number }, number>({
            query: (articleId) => ({
                url: `/articles/${articleId}/count`,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        postComment: builder.mutation<CommentType, CreateCommentDto>({
            query: (comment) => ({
                url: '/comments',
                method: 'POST',
                body: comment,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        postCommentReply: builder.mutation<CommentType, CreateCommentReplyDto>({
            query: ({ commentId, ...reply }) => ({
                url: `/comments/${commentId}/reply`,
                method: 'POST',
                body: reply,
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        postCommentLike: builder.mutation<
            void,
            { commentId: number; email: string }
        >({
            query: ({ commentId, email }) => ({
                url: `/comments/${commentId}/like`,
                method: 'POST',
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
                body: {
                    email,
                },
            }),
        }),
        postStatusUpdate: builder.mutation<
            void,
            { commentId: number; status: 'FLAGGED' | 'REJECTED'; email: string } // Update as needed for other statuses
        >({
            query: ({ commentId, status, email }) => ({
                url: `/comments/${commentId}/status`,
                method: 'PATCH',
                body: { status, changedByEmail: email },
                headers: {
                    'X-API-KEY': 'abracadabra',
                },
            }),
        }),
        postCommentUpdate: builder.mutation<
            CommentType,
            { commentId: number; content: string; email: string }
        >({
            query: ({ commentId, content, email }) => ({
                url: `/comments/${commentId}`,
                method: 'PATCH',
                body: { content, userEmail: email },
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
    usePostCommentLikeMutation,
    usePostStatusUpdateMutation,
    usePostCommentUpdateMutation,
} = commentApi
