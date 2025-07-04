import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./api/authApi";
import { commonApi } from "./api/commonApi";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "common"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  auth: authReducer,
  common: commonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(authApi.middleware, commonApi.middleware),
});

export const persistor = persistStore(store);

// ✅ Type helper for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
