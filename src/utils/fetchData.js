// src/utils/fetchData.js

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} for ${url}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("fetchData error:", error);
    throw error;
  }
};

export default fetchData;
