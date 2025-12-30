import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { commonApi } from "./api/commonApi";
import authReducer from "./slices/authSlice";
import comparisonSlice from "./slices/comparisonSlice";
import advanceSearchReducer from "./slices/advanceSearchSlice";
import commonReducer from "./slices/commonSlice";
import sellUsedReducer from "./slices/sellUsedSlice";
import carModelSlice from "./slices/carModelSlice";
import { websiteContentApi } from "./api/websiteContentApi";
import { homeModuleApi } from "./api/homeModuleApi";
import { carModuleApi } from "./api/carModuleApi";
import { locationModuleApi } from "./api/locationModuleApi";
import { newsModuleApi } from "./api/newsModuleApi";
import { contentModuleApi } from "./api/contentModuleApi";
import { videosModuleApi } from "./api/videosModuleApi";
import { fuelModuleApi } from "./api/fuelModuleApi";
import { authModuleApi } from "./api/authModuleApi";
import { webstoriesModuleApi } from "./api/webstoriesModuleApi";
import { searchModuleApi } from "./api/searchModuleApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "common"],
};

const rootReducer = combineReducers({
  [authModuleApi.reducerPath]: authModuleApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [homeModuleApi.reducerPath]: homeModuleApi.reducer,
  [contentModuleApi.reducerPath]: contentModuleApi.reducer,
  [videosModuleApi.reducerPath]: videosModuleApi.reducer,
  [websiteContentApi.reducerPath]: websiteContentApi.reducer,
  [carModuleApi.reducerPath]: carModuleApi.reducer,
  [locationModuleApi.reducerPath]: locationModuleApi.reducer,
  [newsModuleApi.reducerPath]: newsModuleApi.reducer,
  [fuelModuleApi.reducerPath]: fuelModuleApi.reducer,
  [webstoriesModuleApi.reducerPath]: webstoriesModuleApi.reducer,
  [searchModuleApi.reducerPath]: searchModuleApi.reducer,

  auth: authReducer,
  common: commonReducer,
  sellUsed: sellUsedReducer,
  filters: advanceSearchReducer,
  carModelSlice: carModelSlice,
  comparisonSlice: comparisonSlice,
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
      authModuleApi.middleware,
      commonApi.middleware,
      homeModuleApi.middleware,
      contentModuleApi.middleware,
      videosModuleApi.middleware,
      websiteContentApi.middleware,
      carModuleApi.middleware,
      locationModuleApi.middleware,
      newsModuleApi.middleware,
      fuelModuleApi.middleware,
      webstoriesModuleApi.middleware,
      searchModuleApi.middleware,
    ),
});

export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
