import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { getLocale } from '../load';
import { initBrands, initSubBrands, setLanguage } from './actions/globActions';
import reducers from './reducers';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'glob'],
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, reducers);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const initialState = {};

let enhancer = compose;

if (__DEV__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  persistedReducer,
  initialState,
  enhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store, undefined, async () => {
  const appVersion = '1.2.15';
  const localAppVersion = await AsyncStorage.getItem('appVersion');
  const languageName = store.getState().glob.languageName;
  const locale = getLocale();
  const isRTL = locale.isRTL;
  const systemLang = locale.lang.substring(0, 2);
  if (
    !languageName ||
    languageName === '' ||
    languageName !== systemLang ||
    localAppVersion !== appVersion
  ) {
    const { ar, en, tr } = require('../../languages');
    const { brands, subBrands } = require('../constants');
    // TODO: add turkey language after file is ready
    // const lang = systemLang === 'ar' ? ar : systemLang === 'tr' ? tr : en;
    const lang = systemLang === 'ar' ? ar : en;
    await store.dispatch(setLanguage(lang, systemLang || 'en', isRTL));
    await store.dispatch(initBrands(brands));
    await store.dispatch(initSubBrands(subBrands));
    await AsyncStorage.setItem('appVersion', appVersion);
  }
});
