import axios from "axios";

export default axios.create({
  baseURL: "https://youtube-clone-api-production-a52b.up.railway.app/api",
  headers: { 'token': localStorage.getItem('token') }
});
