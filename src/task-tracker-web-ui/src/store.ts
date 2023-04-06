import { configureStore } from '@reduxjs/toolkit'
import { taskSlice } from './features/tasks/taskSlice';
export const store = configureStore({
    reducer: {
        [taskSlice.name]: taskSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch
