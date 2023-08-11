import { server } from "@/config";
import axios from "axios";

const userClient = axios.create({
  baseURL: `${server}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default userClient;
