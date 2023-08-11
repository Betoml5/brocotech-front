import { server } from "@/config";
import axios from "axios";

const authClient = axios.create({
  baseURL: `${server}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});