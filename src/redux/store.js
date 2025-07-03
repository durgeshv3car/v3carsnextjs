import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for web
import { authApi } from './api/authApi';
import authReducer from './slices/authSlice'; 
import commonReducer from './slices/commonSlice';
import { commonApi } from './api/commonApi';


const persistConfig = {
  key: 'root',
  storage, // Use localStorage
  whitelist: ['auth', 'common'],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  auth: authReducer,
  common: commonReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions
      },
    }).concat(
      authApi.middleware,
      commonApi.middleware,
    
    ), // Add middleware
});

const persistor = persistStore(store);

export { store as default, persistor };
