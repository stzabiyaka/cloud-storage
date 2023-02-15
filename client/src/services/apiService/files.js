import axios from 'axios';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const fetchFiles = async (_, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    const { sort, currentDirectory } = thunkAPI.getState().files;
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${authToken}` },
      url: `${BASE_URL}/files/`,
      params: { parent: currentDirectory, sort: sort.param, sortDirection: sort.direction ?? 1 },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const searchFiles = async ({ search }, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${authToken}` },
      url: `${BASE_URL}/files/search/`,
      params: { search },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const createDir = async ({ name }, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    const { currentDirectory } = thunkAPI.getState().files;
    const data = { name, type: 'dir', parent: currentDirectory };

    const response = await axios({
      method: 'post',
      headers: { Authorization: `Bearer ${authToken}` },
      url: `${BASE_URL}/files/dirs/`,
      data,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const uploadFile = async (
  { file, pushUploadToStack, removeFromUploadsStack, changeUploadsProgress, increaseUserUsedSpace },
  thunkAPI
) => {
  const { authToken } = thunkAPI.getState().user;
  const { currentDirectory } = thunkAPI.getState().files;
  const { name } = file;
  const id = nanoid(6);
  try {
    thunkAPI.dispatch(pushUploadToStack({ id, name, progress: 0 }));

    const formData = new FormData();
    formData.append('file', file);
    const data = formData;

    const response = await axios({
      method: 'post',
      headers: { Authorization: `Bearer ${authToken}` },
      url: `${BASE_URL}/files/${currentDirectory ? currentDirectory : 'root'}`,
      data,
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        thunkAPI.dispatch(changeUploadsProgress({ id, progress: percent }));
      },
    });
    thunkAPI.dispatch(removeFromUploadsStack({ id }));
    thunkAPI.dispatch(increaseUserUsedSpace(file.size));
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    thunkAPI.dispatch(removeFromUploadsStack({ id }));
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const downloadFile = async ({ id = null, name }, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${authToken}` },
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

export const deleteFile = async ({ id = null, size = 0, decreaseUserUsedSpace }, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    const response = await axios({
      method: 'delete',
      headers: { Authorization: `Bearer ${authToken}` },
      url: `${BASE_URL}/files/${id}`,
    });
    thunkAPI.dispatch(decreaseUserUsedSpace(size));
    toast.success(response.data.message);
    return id;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
