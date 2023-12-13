import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { noteAPI } from "./services/noteApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counterReducer,
    [noteAPI.reducerPath]: noteAPI.reducer,
  },
  devTools: process.env.NODE_ENV !== "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([noteAPI.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
