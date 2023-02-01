import axios from "axios";
import { server } from "@/config";
const DeviceRequestClient = axios.create({
  baseURL: `${server}/device-requests`,
});

export const createDeviceRequestAPI = async (data) => {
  if (!data) {
    throw new Error("No data provided to create device request");
  }

  try {
    const response = await DeviceRequestClient.post("/", { data });
    return response.data;
  } catch (error) {
    return error;
  }
};
