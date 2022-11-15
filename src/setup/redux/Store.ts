import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {reduxBatch} from '@manaflair/redux-batch'
import {persistStore} from 'redux-persist'
import {rootReducer, rootSaga} from './RootReducer'
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync";

const reduxStateSyncConfig = {
  whitelist: ["[Logout] Action", "[Login] Action", "[RefreshToken] Action"]
};
const stateSyncMiddleware = createStateSyncMiddleware(reduxStateSyncConfig);

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
  stateSyncMiddleware
]

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})

export type AppDispatch = typeof store.dispatch

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
initMessageListener(store);
export default store
