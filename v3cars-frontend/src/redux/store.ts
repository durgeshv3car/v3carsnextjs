import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./api/authApi";
import { commonApi } from "./api/commonApi";
import { homeApi } from "./api/homeApi";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";
import sellUsedReducer from "./slices/sellUsedSlice"; // 👈 add
import { upcomingApi } from "./api/upcomingApi";
import { latestcarApi } from "./api/latestcarApi";
import { popularCarApi } from "./api/popularApi";

const persistConfig = {
  key: "root",
  storage,
  // add here only if you want to persist selections across refresh
  whitelist: ["auth", "common"], // 👈 add sellUsed (optional)
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [upcomingApi.reducerPath]: upcomingApi.reducer,
  [latestcarApi.reducerPath]: latestcarApi.reducer,
  [popularCarApi.reducerPath]: popularCarApi.reducer,
  auth: authReducer,
  common: commonReducer,
  sellUsed: sellUsedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      authApi.middleware, 
      commonApi.middleware,
      homeApi.middleware,
      upcomingApi.middleware,
      latestcarApi.middleware,
      popularCarApi.middleware,
    ),
});

export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
