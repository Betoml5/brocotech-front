import { server } from "@/config";
import axios from "axios";

const productsClient = axios.create({
  baseURL: `${server}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});
// Agregue "" a queryParams para que no se rompa si no se envía nada

export const getProductsAPI = async (queryParams = "") => {
  console.log(server);
  try {
    const response = await productsClient.get(`${queryParams}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
// Agregue "" a queryParams para que no se rompa si no se envía nada

export const getProductAPI = async (id, queryParams = "") => {
  try {
    const response = await productsClient.get(`/${id}${queryParams}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
