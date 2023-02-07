import { createSlice } from '@reduxjs/toolkit';
import { signInUser, getCurrentUser } from '../operations';

const initialState = {
  currentUser: {},
  authToken: null,
  isAuth: false,
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
      state.isAuth = initialState.isAuth;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
    purgeError(state) {
      state.error = null;
    },
    increaseUserUsedSpace(state, action) {
      state.currentUser = {
        ...state.currentUser,
        usedSpace: state.currentUser?.usedSpace + action.payload,
      };
    },
    decreaseUserUsedSpace(state, action) {
      state.currentUser = {
        ...state.currentUser,
        usedSpace: state.currentUser?.usedSpace - action.payload,
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
      state.currentUser = action.payload?.user;
      state.authToken = action.payload?.token;
      state.isAuth = true;
    },
    [signInUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getCurrentUser.pending]: state => {
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload?.user;
      state.authToken = action.payload?.token;
      state.isAuth = true;
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { unsetUser, purgeError, increaseUserUsedSpace, decreaseUserUsedSpace } =
  userSlice.actions;

export const selectIsAuth = state => state.user.isAuth;

export const selectCurrentUser = state => state.user.currentUser;

export const selectCurrentUserFreeSpace = state =>
  state.user.currentUser.diskSpace - state.user.currentUser.usedSpace;

export const selectIsLoading = state => state.user.isLoading;

export const selectError = state => state.user.error;

export const userReducer = userSlice.reducer;
