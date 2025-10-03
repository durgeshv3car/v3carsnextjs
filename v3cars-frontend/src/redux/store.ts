import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./api/authApi";
import { commonApi } from "./api/commonApi";
import { homeApi } from "./api/homeApi";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";
import sellUsedReducer from "./slices/sellUsedSlice"
import { upcomingApi } from "./api/upcomingApi";
import { latestcarApi } from "./api/latestcarApi";
import { popularCarApi } from "./api/popularApi";
import { electricApi } from "./api/electricApi";
import { newsApi } from "./api/newsApi";
import { autoExpoApi } from "./api/autoExpoApi";
import { expertReviewApi } from "./api/expertReviewApi";
import { comparisonApi } from "./api/comparisonApi";
import { featuresExplainedApi } from "./api/featuresExplainedApi";
import { carGuideApi } from "./api/carGuideApi";
import { carReviewVideoApi } from "./api/carReviewVideosApi";
import { compareVideosApi } from "./api/compareVideos";
import { variantsExplainedVideosApi } from "./api/variantsExplainedVideosApi";
import { autoExpoVideosApi } from "./api/autoExpoVideosApi";
import { variantExplainedApi } from "./api/variantExplainedApi";
import { otherVideosApi } from "./api/otherVideosApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "common"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [upcomingApi.reducerPath]: upcomingApi.reducer,
  [latestcarApi.reducerPath]: latestcarApi.reducer,
  [popularCarApi.reducerPath]: popularCarApi.reducer,
  [electricApi.reducerPath]: electricApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [autoExpoApi.reducerPath]: autoExpoApi.reducer,
  [expertReviewApi.reducerPath]: expertReviewApi.reducer,
  [comparisonApi.reducerPath]: comparisonApi.reducer,
  [featuresExplainedApi.reducerPath]: featuresExplainedApi.reducer,
  [carGuideApi.reducerPath]: carGuideApi.reducer,
  [carReviewVideoApi.reducerPath]: carReviewVideoApi.reducer,
  [compareVideosApi.reducerPath]: compareVideosApi.reducer,
  [variantsExplainedVideosApi.reducerPath]: variantsExplainedVideosApi.reducer,
  [autoExpoVideosApi.reducerPath]: autoExpoVideosApi.reducer,
  [variantExplainedApi.reducerPath]: variantExplainedApi.reducer,
  [otherVideosApi.reducerPath]: otherVideosApi.reducer,
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
      electricApi.middleware,
      newsApi.middleware,
      autoExpoApi.middleware,
      expertReviewApi.middleware,
      comparisonApi.middleware,
      featuresExplainedApi.middleware,
      carGuideApi.middleware,
      carReviewVideoApi.middleware,
      compareVideosApi.middleware,
      variantsExplainedVideosApi.middleware,
      autoExpoVideosApi.middleware,
      variantExplainedApi.middleware,
      otherVideosApi.middleware,
    ),
});

export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
