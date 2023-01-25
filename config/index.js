export const server =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:1337/api";
