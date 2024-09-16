import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { articleApi } from './article'
import { publisherApi } from './publisher'
import { authApi } from './auth'
import { commentApi } from './comment'

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [publisherApi.reducerPath]: publisherApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            articleApi.middleware,
            publisherApi.middleware,
            authApi.middleware,
            commentApi.middleware,
        ),
    devTools: true,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
