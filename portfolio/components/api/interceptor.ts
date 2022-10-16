import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const client = axios.create({ baseURL: API_URL });
type Options = {
  url: string;
  method: string;
  data?: any;
  withCredentials?: boolean;
  headers?:any
};
const request = (options: Options) => {
  const Success = (res) => res;
  const Error = (err) => err;
  return client(options).then(Success).catch(Error);
};
export default request;
