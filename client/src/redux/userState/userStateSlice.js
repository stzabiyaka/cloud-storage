import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { signInUser, getCurrentUser, updateUserAvatar, deleteUserAvatar } from '../operations';

const initialState = {
  currentUser: {},
  authToken: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    unsetUser(state) {
      state.currentUser = initialState.currentUser;
      state.authToken = initialState.authToken;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
    purgeError(state) {
      state.error = null;
    },
    increaseUserUsedSpace(state, action) {
      state.currentUser = {
        ...state.currentUser,
        usedSpace: state.currentUser.usedSpace + action.payload,
      };
    },
    decreaseUserUsedSpace(state, action) {
      state.currentUser = {
        ...state.currentUser,
        usedSpace: state.currentUser.usedSpace - action.payload,
      };
    },
  },

  extraReducers: {
    [signInUser.pending]: state => {
      state.isLoading = true;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload.user;
      state.authToken = action.payload.token;
    },
    [signInUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.authToken = initialState.authToken;
      state.isLoading = false;
    },
    [getCurrentUser.pending]: state => {
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload.user;
      state.authToken = action.payload.token;
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.authToken = initialState.authToken;
      state.isLoading = false;
    },
    [updateUserAvatar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = { ...state.currentUser, ...action.payload.user };
    },
    [deleteUserAvatar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = { ...state.currentUser, ...action.payload.user };
    },
  },
});

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['authToken'],
};

export const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export const { unsetUser, purgeError, increaseUserUsedSpace, decreaseUserUsedSpace } =
  userSlice.actions;

export const selectIsAuth = state => (state.user.authToken ? true : false);
export const selectIsRefresh = state => (state.user.authToken && !state.user.email ? true : false);
export const selectCurrentUser = state => state.user.currentUser;
export const selectCurrentUserFreeSpace = state => {
  const value = state.user.currentUser.diskSpace - state.user.currentUser.usedSpace;
  const percent = Math.round(value / (state.user.currentUser.diskSpace / 100));
  return { value, percent };
};
export const selectIsLoading = state => state.user.isLoading;
export const selectError = state => state.user.error;
