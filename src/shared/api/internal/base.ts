import axios from "axios";

export const internalApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});