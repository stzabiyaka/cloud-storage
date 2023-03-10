import { createSlice } from '@reduxjs/toolkit';
import { fetchFiles, uploadFile, deleteFile, createDir } from '../operations';

const initialState = {
  files: [],
  currentDirectory: null,
  directoriesStack: [],
  isLoading: false,
  error: null,
  uploadsStack: [],
  sort: { param: 'name', direction: 1 },
  view: 'list',
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
    pushUploadToStack(state, action) {
      state.uploadsStack = [...state.uploadsStack, action.payload];
    },
    removeFromUploadsStack(state, action) {
      state.uploadsStack = [...state.uploadsStack.filter(item => item.id !== action.payload.id)];
    },
    changeUploadsProgress(state, action) {
      state.uploadsStack = [
        ...state.uploadsStack.map(item =>
          item.id === action.payload.id
            ? { ...item, progress: action.payload.progress }
            : { ...item }
        ),
      ];
    },
    purgeUploadsStack(state) {
      state.uploadsStack = initialState.uploadsStack;
    },
    unsetFiles(state) {
      state.files = initialState.files;
      state.currentDirectory = initialState.currentDirectory;
      state.directoriesStack = initialState.directoriesStack;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.uploadsStack = initialState.uploadsStack;
      state.sort = initialState.sort;
      state.view = initialState.view;
    },
    setSort(state, action) {
      state.sort = { ...state.sort, ...action.payload };
    },
    toggleView(state) {
      state.view = state.view === 'list' ? 'tile' : 'list';
    },
  },

  extraReducers: {
    [fetchFiles.pending]: state => {
      state.isLoading = true;
    },
    [fetchFiles.fulfilled]: (state, action) => {
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.files = action.payload;
    },
    [fetchFiles.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = initialState.isLoading;
    },
    [createDir.fulfilled]: (state, action) => {
      state.error = initialState.error;
      state.files = [...state.files, action.payload];
    },
    [createDir.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.error = initialState.error;
      state.files = [...state.files, action.payload];
    },
    [uploadFile.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteFile.pending]: state => {
      state.isLoading = true;
    },
    [deleteFile.fulfilled]: (state, action) => {
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.files = [...state.files.filter(file => file._id !== action.payload)];
    },
    [deleteFile.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = initialState.error;
    },
  },
});

export const {
  setCurrentDir,
  pushDirToStack,
  setDirStack,
  pushUploadToStack,
  removeFromUploadsStack,
  changeUploadsProgress,
  purgeUploadsStack,
  unsetFiles,
  setSort,
  toggleView,
} = filesStateSlice.actions;

export const selectFiles = state => state.files?.files;

export const selectCurrentDir = state => state.files.currentDirectory;

export const selectDirectoriesStack = state => state.files.directoriesStack;

export const selectIsFileLoading = state => state.files.isLoading;

export const selectUploadStack = state => state.files.uploadsStack;

export const selectShowUploader = state => state.files.uploadsStack.length > 0;

export const selectSort = state => state.files.sort;

export const selectView = state => state.files.view;

export const filesReducer = filesStateSlice.reducer;
