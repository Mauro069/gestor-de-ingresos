import axios from "axios";

const data = JSON.parse(localStorage.getItem("gdi-user")!);

export const api = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: { token: data?.token },
});
