import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const{VITE_API_CHAT} = getEnvVariables();

const chatApi = axios.create({
    baseURL: VITE_API_CHAT,
  });


chatApi.interceptors.request.use((config) => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default chatApi;
