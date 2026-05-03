import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tmdbApi } from "../store/tmdbApi";
import { tmdbReducer, tmdbSlice } from "./tmdb-slice";

export const store = configureStore({
  reducer: {
    [tmdbSlice.name]: tmdbReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)