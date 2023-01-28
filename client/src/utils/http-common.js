import axios from "axios";

export default axios.create({
  baseURL: "https://youtube-clone-api.cyclic.app/api",
  headers: { 'token': localStorage.getItem('token') }
});
