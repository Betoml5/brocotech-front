export const server =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:1337/api";

export const isDev = process.env.NODE_ENV === "development";
export const imagePrefix = isDev
  ? "http://localhost:1337"
  : process.env.NEXT_PUBLIC_API_BASE_URL;
