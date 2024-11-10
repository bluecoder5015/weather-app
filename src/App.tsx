import { useRef, useState } from "react";
import { fetchWeatherInfo } from "./services/fetchWeatherInfo";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [location, setLocation] = useState<string>("India");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch weather data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchWeatherInfo(location),
  });

  // Handle location change
  const handleLocationChange = () => {
    if (inputRef?.current?.value) {
      setLocation(inputRef.current.value);
      inputRef.current.value = ""; 
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="mb-8 flex items-center gap-2">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter Location"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleLocationChange}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
        >
          Submit
        </button>
      </div>

      <div className="glass-card flex flex-col items-center justify-center p-6 w-80 h-72 rounded-xl shadow-lg">
        {/* Loading, Error, and Data Display Logic */}
        {isLoading ? (
          <div className="text-white text-lg font-medium">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-lg font-medium">
            {error.message}
          </div>
        ) : (
          <>
            {/* Location Info */}
            <div className="text-white text-xl font-semibold mb-4">
              {data?.location?.name}, {data?.location?.country}
            </div>

            {/* Weather Data: Temperature, Description */}
            <div className="text-white text-4xl font-semibold">
              {data?.current?.temperature}°C
            </div>
            <div className="text-white text-lg font-medium opacity-75 mb-2">
              {data?.current?.weather_descriptions?.[0]}
            </div>

            {/* Additional Info */}
            <div className="text-white text-sm opacity-75 mb-2">
              Feels like {data?.current?.feelslike}°C
            </div>
            <div className="text-white text-sm opacity-75 mb-2">
              Wind: {data?.current?.wind_speed} km/h {data?.current?.wind_dir}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
