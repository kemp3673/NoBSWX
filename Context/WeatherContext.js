import React, { useState } from "react";

// create a new context
export const WeatherContext = React.createContext();

// create a provider component that will be used to wrap the app
export const WeatherProvider = ({ children }) => {
  const [isNight, setIsNight] = useState(false);

  return (
    // pass down the state values and functions to the provider value prop
    <WeatherContext.Provider
      value={{
        isNight,
        setIsNight,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
