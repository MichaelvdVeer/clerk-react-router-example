import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Custom base query to include the Clerk token in headers
const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: async (headers) => {
    // Retrieve the token from the Clerk session
    const token = await window.Clerk.session.getToken(); // Adjust this if necessary

    // If a token is returned, set it in the Authorization header
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});

export const {} = apiSlice;

export default apiSlice;
