import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

export const signUp = async ({ email, password }) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/signup`,
      data: { email, password },
    });
    alert(response.data.message);
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const signIn = async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/signin`,
      data: { email, password },
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, response.data.token);
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};