const PUBLIC_URL = process.env.REACT_APP_BACKEND_BASE_URL.replace('api', '');

const avatarURLResolver = ({ avatarURL }) => {
  return `${PUBLIC_URL}${avatarURL}`;
};

export default avatarURLResolver;
