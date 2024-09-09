import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { articleApi } from './article'
import { publisherApi } from './publisher'

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [publisherApi.reducerPath]: publisherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            articleApi.middleware,
            publisherApi.middleware,
        ),
    devTools: true,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
