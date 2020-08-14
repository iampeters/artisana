import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from './middleware/logger';
import monitorReducersEnhancer from './enhancers/monitorReducer';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'artisana',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'onboarding']
};

export default () => {
  let middlewares = [];
  let composedEnhancers: any = [];

  if (process.env.NODE_ENV === 'development') {
    middlewares = [loggerMiddleware, thunkMiddleware];
  } else {
    middlewares = [thunkMiddleware];
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers: any = [middlewareEnhancer, monitorReducersEnhancer];

  if (process.env.NODE_ENV === 'development') {
    composedEnhancers = composeWithDevTools(...enhancers);
  } else {
    composedEnhancers = compose(...enhancers);
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer, composedEnhancers);
  let persistor = persistStore(store);

  return { store, persistor };
};
