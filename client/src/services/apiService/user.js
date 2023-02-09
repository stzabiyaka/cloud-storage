import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

export const getCurrentUser = async (_, thunkAPI) => {
  try {
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/user/`,
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, response.data.token);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const updateUserAvatar = async ({ file }, thunkAPI) => {
  try {
    let url = `${BASE_URL}/users/avatar/`;

    const formData = new FormData();
    formData.append('avatar', file);
    const data = formData;

    const response = await axios({
      method: 'patch',
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

export const deleteUserAvatar = async (_, thunkAPI) => {
  try {
    let url = `${BASE_URL}/users/avatar/`;

    const response = await axios({
      method: 'delete',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
