import userClient from "./axios/UserClient";

export const loginAPI = async (data) => {
  try {
    const response = await userClient.post("/auth/local", {
      identifier: data.identifier,
      password: data.password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
