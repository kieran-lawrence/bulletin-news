import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Comment as CommentType, CreateCommentDto } from '../../types'
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/comment',
    }),
    endpoints: (builder) => ({
        getCommentsByArticleId: builder.query<CommentType[], number>({
            query: (articleId) => `/article/${articleId}`,
        }),
        postComment: builder.mutation<CommentType, CreateCommentDto>({
            query: ({ accessToken, ...comment }) => ({
                url: '/',
                method: 'POST',
                body: comment,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
    }),
})
export const { useGetCommentsByArticleIdQuery, usePostCommentMutation } =
    commentApi
