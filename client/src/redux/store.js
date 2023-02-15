import { configureStore } from '@reduxjs/toolkit';
import { filesReducer } from './filesState/filesStateSlice';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistedUserReducer } from './userState';

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    files: filesReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store);

// const store = configureStore({ reducer: { files: filesReducer, user: userReducer } });

// export { store };
