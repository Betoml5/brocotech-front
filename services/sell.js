import userClient from "./axios/UserClient";

export const getSellAPI = async () => {
  try {
    const response = await userClient.get("/sells?populate=product");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
