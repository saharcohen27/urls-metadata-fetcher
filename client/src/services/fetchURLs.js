import axios from "axios";

export default async function fetchData(url, urls) {
  // Check if urls is an array and not empty
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error("Invalid URL list");
  }
  try {
    const response = await axios.post(url, {
      urls,
    });

    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for handling in the calling function
  }
}
