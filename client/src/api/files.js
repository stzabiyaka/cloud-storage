import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

export const fetchFiles = async ({ dirId }, thunkAPI) => {
  const parent = dirId ? dirId : null;
  try {
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/`,
      params: { parent },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const addFile = async ({ dirId, name, type }, thunkAPI) => {
  try {
    const response = await axios({
      method: 'post',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/`,
      data: { name, type: 'dir', parent: dirId },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
