export const server =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3013/api";
