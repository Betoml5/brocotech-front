import { server } from "@/config";
import axios from "axios";

const productsClient = axios.create({
  baseURL: `${server}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProductsAPI = async (queryParams) => {
  try {
    const response = await productsClient.get(`${queryParams}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProductAPI = async (id, queryParams) => {
  try {
    const response = await productsClient.get(`/${id}${queryParams}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
