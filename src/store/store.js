import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // Imports: Redux
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index.js' // Middleware: Redux Persist Config

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  blacklist: [
    'web3Reducer',
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
  ),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {
  store,
  persistor,
};
