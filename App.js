import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View, Text, StatusBar, Image } from "react-native";
import React, { useState, useEffect, createContext } from "react";
import * as Location from "expo-location";

// Styles
import { AppStyles } from "./styles/styles";

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
    latitude: 40.7128,
    longitude: -74.0061,
  });
  const [zone, setZone] = useState(null);
  const [relativeLocation, setRelativeLocation] = useState({
    state: null,
    city: null,
  });
  const [observationStations, setObservationStations] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: Number(userLocation.coords.latitude.toFixed(4)),
        longitude: Number(userLocation.coords.longitude.toFixed(4)),
      });
    })();
  }, []);

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
    <View style={AppStyles.splashContainer}>
      <Image
        source={require("./assets/weatherSplash.gif")}
        style={AppStyles.splashImage}
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
        <View style={AppStyles.footer}>
          <Text style={AppStyles.footerText}>Data Sourced from NOAA</Text>
          <Image
            source={require("./assets/noaa-logo.png")}
            style={AppStyles.footerImg}
          />
        </View>
      </SafeAreaView>
    </WeatherContext.Provider>
  );
}
