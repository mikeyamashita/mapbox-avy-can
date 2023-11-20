import { configureStore } from '@reduxjs/toolkit'
import areaSlice from './state/area/areaSlice.ts'
// ...

export const store = configureStore({
    reducer: {
        areas: areaSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch