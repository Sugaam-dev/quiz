import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz.sugaam.in",
});

export default api;