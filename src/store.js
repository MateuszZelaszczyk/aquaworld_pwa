import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './Reducers/index';


const store = configureStore({
    reducer: rootReducer,
    middleware:  (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : undefined,
  });
export default store

