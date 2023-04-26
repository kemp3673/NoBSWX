import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import React, { useState, useEffect, createContext } from "react";

// Helpers
import { getWXData, getWeatherStation } from "./utility/WeatherHelpers";
import { nightCheck } from "./utility/OtherHelpers";

import MyTabs from "./Navigators/TopBar";

const Tab = createMaterialTopTabNavigator();

export const WeatherContext = createContext(null);

export default function App() {
  const [tempSplash, setTempSplash] = useState(true);

  const [isNight, setIsNight] = useState(false);
  const [localForecastUrl, setLocalForecastUrl] = useState(null);
  const [hourlyForecastUrl, setHourlyForecastUrl] = useState(null);
  const [location, setLocation] = useState({
    latitude: 38.9072,
    longitude: -77.0369,
  });
  const [zone, setZone] = useState(null);
  const [relativeLocation, setRelativeLocation] = useState({
    state: null,
    city: null,
  });
  const [observationStations, setObservationStations] = useState(null);

  useEffect(() => {
    setTimeout(() => setTempSplash(false), 5000);
    setIsNight(new Date().getHours() > 18 || new Date().getHours() < 6);
    getWXData(location)
      .then((data) => {
        setLocalForecastUrl(data.forecast);
        setHourlyForecastUrl(data.hourlyForecast);
        setRelativeLocation({ city: data.city, state: data.state });
        setObservationStations(data.observationStations);
        setZone(data.forecastZone);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [location]);

  // Add splash screen until data is loaded
  return tempSplash ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("./assets/weatherSplash.gif")}
        style={{ height: "100%", width: "100%", resizeMode: "cover" }}
      />
    </View>
  ) : (
    <WeatherContext.Provider
      value={{
        localForecastUrl,
        setLocation,
        hourlyForecastUrl,
        location,
        zone,
        relativeLocation,
        observationStations,
        isNight,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <MyTabs />
        <View style={styles.footer}>
          <Text
            style={{
              color: "white",
              fontSize: 8,
            }}
          >
            Data Sourced from NOAA
          </Text>
          <Image
            source={require("./assets/noaa-logo.png")}
            style={{ height: 20, resizeMode: "contain" }}
          />
        </View>
      </SafeAreaView>
    </WeatherContext.Provider>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#012f47",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
