import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Publisher } from '../../types'

export const publisherApi = createApi({
    reducerPath: 'publisherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/publisher',
    }),
    endpoints: (builder) => ({
        getPublishers: builder.query<Publisher[], string>({
            query: () => `/`,
        }),
        getPublisherById: builder.query<Publisher, string>({
            query: (id) => `/${id}`,
        }),
    }),
})

export const { useGetPublisherByIdQuery, useGetPublishersQuery } = publisherApi
