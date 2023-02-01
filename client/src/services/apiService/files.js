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

export const addFile = async ({ dirId, name, type, file }, thunkAPI) => {
  try {
    let data;
    let url = `${BASE_URL}/files/`;

    switch (type) {
      case 'dir':
        data = { name, type: 'dir', parent: dirId };
        break;
      default:
        url += 'upload/';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('parent', dirId);
        data = formData;
    }

    const response = await axios({
      method: 'post',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url,
      data,
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
        }
      },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const downloadFile = async ({ id = null, name }) => {
  try {
    const response = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}` },
      url: `${BASE_URL}/files/download/`,
      params: { id },
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
    alert(error.message);
  }
};
