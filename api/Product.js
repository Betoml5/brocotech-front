import { server } from "@/config";
import axios from "axios";

const productsClient = axios.create({
  baseURL: `${server}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProductsAPI = async () => {
  try {
    const response = await productsClient.get("/?populate=*");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProductAPI = async (id) => {
  try {
    const response = await productsClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
