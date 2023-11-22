import { configureStore } from '@reduxjs/toolkit'
import areaSlice from './state/area/areaSlice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'
import { areasApi } from './data/area-service';




export const store = configureStore({
    reducer: {
        areas: areaSlice,
        // Add the generated reducer as a specific top-level slice
        [areasApi.reducerPath]: areasApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(areasApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

// export const selectAllAreas = state => state.areas

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch