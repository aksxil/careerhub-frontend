import axios from "axios";

const authMiddleware = () => (next) => (action) => {
  axios.defaults.withCredentials = true;

  return next(action);
};

export default authMiddleware;