import { server } from "@/config";

const productsClient = axios.create({
  baseURL: `${server}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  try {
    const response = await productsClient.get("/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await productsClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
