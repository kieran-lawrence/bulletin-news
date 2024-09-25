import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Publisher } from '../../types'

export const publisherApi = createApi({
    reducerPath: 'publisherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/publisher',
    }),
    endpoints: (builder) => ({
        getPublishers: builder.query<Publisher[], PaginationParams>({
            query: ({ page = 1, page_size = 10 }) =>
                `/?page_size=${page_size}&page=${page}`,
        }),
        getPublisherById: builder.query<Publisher, string>({
            query: (id) => `/${id}`,
        }),
        postPublisher: builder.mutation<Publisher, Omit<Publisher, 'id'>>({
            query: (publisher) => ({
                url: '/',
                method: 'POST',
                body: publisher,
            }),
        }),
    }),
})

export const {
    useGetPublisherByIdQuery,
    useGetPublishersQuery,
    usePostPublisherMutation,
} = publisherApi

interface PaginationParams {
    page?: number
    page_size?: number
}
