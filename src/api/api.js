import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz.sugaam.in",
 //baseURL : "http://localhost:8000"
});

export default api;