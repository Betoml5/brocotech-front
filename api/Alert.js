import { server } from "@/config";
import axios from "axios";

const alertsClient = axios.create({
  baseURL: `${server}/alerts`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAlertsAPI = async (queryParams) => {
    try {
        const response = await alertsClient.get(`${queryParams}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
