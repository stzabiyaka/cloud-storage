import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
export const getCurrentUser = async (_, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${authToken}` },
      url: `${BASE_URL}/user/`,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const updateUserAvatar = async ({ file }, thunkAPI) => {
  try {
    const { authToken } = thunkAPI.getState().user;
    let url = `${BASE_URL}/user/avatar/`;

    const formData = new FormData();
    formData.append('avatar', file);
    const data = formData;

    const response = await axios({
      method: 'patch',
      headers: { Authorization: `Bearer ${authToken}` },
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
    const { authToken } = thunkAPI.getState().user;
    let url = `${BASE_URL}/user/avatar/`;

    const response = await axios({
      method: 'delete',
      headers: { Authorization: `Bearer ${authToken}` },
      url,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
