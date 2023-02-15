import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI, userAPI, filesAPI } from '../services/apiService';

// USER //

export const signInUser = createAsyncThunk('user/setUser', authAPI.signIn);

export const signUpUser = authAPI.signUp;

export const getCurrentUser = createAsyncThunk('user/setUser', userAPI.getCurrentUser);

export const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', userAPI.updateUserAvatar);

export const deleteUserAvatar = createAsyncThunk('user/unsetUserAvatar', userAPI.deleteUserAvatar);

// FILES //

export const fetchFiles = createAsyncThunk('files/setFiles', filesAPI.fetchFiles);

export const searchFiles = createAsyncThunk('files/setFiles', filesAPI.searchFiles);

export const createDir = createAsyncThunk('files/createDir', filesAPI.createDir);

export const uploadFile = createAsyncThunk('files/uploadFile', filesAPI.uploadFile);

export const downloadFile = createAsyncThunk('files/downloadFile', filesAPI.downloadFile);

export const deleteFile = createAsyncThunk('files/deleteFile', filesAPI.deleteFile);
