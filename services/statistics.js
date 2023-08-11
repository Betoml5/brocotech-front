import userClient from "./axios/UserClient";

export const getProjectionAPI = async () => {
  try {
    const response = await userClient.get("/projection");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGrossProjectionAPI = async () => {
  try {
    const response = await userClient.get("/gross-projection");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
