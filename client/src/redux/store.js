import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import videoReducer from './reducers/videoReducer'
import appReducer from './reducers/appReducer'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({ user: userReducer, video: videoReducer, app: appReducer })

const persistedReducer = persistReducer(persistConfig, reducers)



export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)