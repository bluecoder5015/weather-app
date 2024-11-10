import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherstack.com/current?";

export const fetchWeatherInfo = async (location: string) => {
  // Check if the API key is available
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Please ensure that REACT_APP_WEATHER_API_KEY is set in the .env file."
    );
  }

  try {
    const res = await axios.get(`${BASE_URL}`, {
      params: {
        access_key: API_KEY,
        query: location,
      },
    });

    if (res.data.success === false) {
      throw new Error(
        res.data.error.info ||
          "Unknown error occurred while fetching weather data."
      );
    }

    // Return the weather data
    return res.data;
  } catch (err: any) {
    if (err.response) {
      console.error("Error fetching weather info:", err.response.data);
      throw new Error(
        `Error: ${err.response.data.error?.info || err.response.statusText}`
      );
    } else if (err.request) {
      console.error("No response from the weather API:", err.request);
      throw new Error(
        "No response from the weather API. Please check your internet connection."
      );
    } else {
      console.error("Error:", err.message);
      throw new Error(err.message);
    }
  }
};
