import axios from "axios";
const BASE_URL = "https://json-server-blond.vercel.app";

const BASE_USER_URL = `${BASE_URL}`;

const AXIOS_INSTANCE_GENERATOR = (BASE_URL) => {
  let config = {
    baseURL: BASE_URL,
  };

  return axios.create(config);
};

export { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL };
