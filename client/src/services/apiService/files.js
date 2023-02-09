import axios from 'axios';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

export const fetchFiles = async ({ parent, sort }, thunkAPI) => {
  try {
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/`,
      params: { parent, sort: sort.param, sortDirection: sort.direction ?? 1 },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const searchFiles = async ({ search }, thunkAPI) => {
  try {
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/search/`,
      params: { search },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const createDir = async ({ dirId, name, type }, thunkAPI) => {
  try {
    const data = { name, type, parent: dirId };
    let url = `${BASE_URL}/files/dirs/`;

    const response = await axios({
      method: 'post',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url,
      data,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const addFile = async (
  { dirId, name, file, pushUpload, removeUpload, changeProgress, increaseUsedSpace },
  thunkAPI
) => {
  const id = nanoid(6);
  try {
    let url = `${BASE_URL}/files/${dirId ? dirId : 'root'}`;

    pushUpload({ id, name, progress: 0 });

    const formData = new FormData();
    formData.append('file', file);
    const data = formData;

    const response = await axios({
      method: 'post',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url,
      data,
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        changeProgress({ id, progress: percent });
      },
    });
    removeUpload({ id });
    increaseUsedSpace({ size: file.size });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    removeUpload({ id });
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const downloadFile = async ({ id = null, name }) => {
  try {
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/${id}`,
      responseType: 'blob',
    });

    if (response.status === 200) {
      const fileURL = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteFile = async ({ id = null, decreaseUsedSpace }) => {
  try {
    const response = await axios({
      method: 'delete',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/${id}`,
    });
    decreaseUsedSpace();
    toast.success(response.data.message);
    return id;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
