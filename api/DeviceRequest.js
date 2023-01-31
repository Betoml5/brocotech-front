import axios from "axios";
import { server } from "@/config";
const DeviceRequestClient = axios.create({
  baseURL: `${server}/device-requests`,
});

export const createDeviceRequestAPI = async (data) => {
  try {
    const response = await DeviceRequestClient.post("/", { data });
    return response.data;
  } catch (error) {
    return error;
  }
};
