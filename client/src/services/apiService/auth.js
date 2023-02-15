import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const signUp = async ({ name, email, password }) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/signup`,
      data: { name, email, password },
    });
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const signIn = async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/signin`,
      data: { email, password },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
