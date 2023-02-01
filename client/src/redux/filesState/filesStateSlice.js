import { createSlice } from '@reduxjs/toolkit';
import { fetchFiles, addFile, deleteFile } from '../operations';

const initialState = {
  files: [],
  currentDirectory: null,
  directoriesStack: [],
  isLoading: false,
  error: null,
};

const filesStateSlice = createSlice({
  name: 'files',

  initialState,

  reducers: {
    setCurrentDir(state, action) {
      state.currentDirectory = action.payload;
    },
    pushDirToStack(state, action) {
      state.directoriesStack = [...state.directoriesStack, action.payload];
    },
    setDirStack(state, action) {
      state.directoriesStack = action.payload;
    },
    purgeFiles(state) {
      state = initialState;
    },
  },

  extraReducers: {
    [fetchFiles.pending]: state => {
      state.isLoading = true;
    },
    [fetchFiles.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.files = action.payload;
    },
    [fetchFiles.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [addFile.pending]: state => {
      state.isLoading = true;
    },
    [addFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.files = [...state.files, action.payload];
    },
    [addFile.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [deleteFile.pending]: state => {
      state.isLoading = true;
    },
    [deleteFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.files = [...state.files.filter(file => file._id === action.payload)];
    },
    [deleteFile.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { purgeFiles, setCurrentDir, pushDirToStack, setDirStack } = filesStateSlice.actions;

export const selectFiles = state => state.files?.files;

export const selectCurrentDir = state => state.files.currentDirectory;

export const selectDirectoriesStack = state => state.files.directoriesStack;

export const selectIsFileLoading = state => state.files.isLoading;

export const filesReducer = filesStateSlice.reducer;
