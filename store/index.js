import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';
import {AsyncStorage} from "react-native";

const persistConfig = {
    transforms: [immutableTransform()],
    storage: AsyncStorage,
    key: 'root',
    whitelist: ['auth'],
};

const reducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(logger));

export default store;