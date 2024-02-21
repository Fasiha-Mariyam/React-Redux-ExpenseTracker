import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistConfig, rootReducer } from './rootReducer';
import { resetAuth } from './slices/auth';
import { resetAccounts } from './slices/account';
import { resetCategory } from './slices/category';
import { resetTransaction } from './slices/transaction';

const store = configureStore({
  reducer: persistReducer(PersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export function logOut() {
  return async (dispatch) => {
    await dispatch(resetAuth());
    await dispatch(resetAccounts());
    await dispatch(resetCategory());
    await dispatch(resetTransaction());
    await persistor.purge();
    await localStorage.clear();
  };
}

export default { store, persistor };