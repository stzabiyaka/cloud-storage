import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI, userAPI, filesAPI } from '../services/apiService';

// USER //

export const signInUser = createAsyncThunk('user/setUser', authAPI.signIn);

export const getCurrentUser = createAsyncThunk('user/getUser', userAPI.getCurrentUser);

// FILES //

export const fetchFiles = createAsyncThunk('files/setFiles', filesAPI.fetchFiles);

export const addFile = createAsyncThunk('files/addFile', filesAPI.addFile);

export const deleteFile = createAsyncThunk('files/deleteFile', filesAPI.deleteFile);
