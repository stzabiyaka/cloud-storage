import axios from 'axios';

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
    alert(error.response.data.message);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
