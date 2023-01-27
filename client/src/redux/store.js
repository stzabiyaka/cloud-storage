import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userState/userStateSlice';
import { filesReducer } from './filesState/filesStateSlice';

const store = configureStore({ reducer: { files: filesReducer, user: userReducer } });

export { store };
