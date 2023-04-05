import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/productSlice'
import handbookReducer from './reducers/handbookSlice'
import basketReducer from './reducers/basketSlice'
import adminReducer from './reducers/adminSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'basketReducer',
    'adminReducer'
  ]
}

const rootReducer = combineReducers({
  productReducer,
  handbookReducer,
  basketReducer,
  adminReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
}

export const store = setupStore()
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch =  AppStore['dispatch']