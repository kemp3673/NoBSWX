import { SafeAreaView, View, Text, StatusBar, Image } from "react-native";
import React, { useState, useEffect, createContext } from "react";
import "expo-dev-client";
import * as Location from "expo-location";

// Styles
import { AppStyles } from "./styles/styles";

// Helpers
import {
  getWXData,
  getWeatherStation,
  getCurrentConditions,
  getAlerts,
} from "./utility/WeatherHelpers";
import { nightCheck } from "./utility/OtherHelpers";

// Components
import MyTabs from "./Navigators/TopBar";

// Context Provider
import { WeatherProvider } from "./Context/WeatherContext";

// TODO - Track bug on why sometimes state is not sent to children on update (i.e. when location changes)
export default function App() {
  // Local state
  const [timerComplete, setTimerComplete] = useState(false);
  const [tempSplash, setTempSplash] = useState(true);

  // State to be passed to children
  const [baseData, setBaseData] = useState({});
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentObserved, setCurrentObserved] = useState(null);
  const [weatherStation, setWeatherStation] = useState(null);
  const [alerts, setAlerts] = useState(null);

  // Get user location when app loads
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation({
          latitude: 40.7128,
          longitude: -74.0061,
        });
        console.error("Permission to access location was denied");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: Number(userLocation.coords.latitude.toFixed(4)),
        longitude: Number(userLocation.coords.longitude.toFixed(4)),
      });
    })();
    // Create a timer to signal its ok to remove splash screen after 5 seconds
    setTimeout(() => {
      setTimerComplete(false);
    }, 5000);
    // Clear splash screen after 60 seconds (in case data fails to load)
    setTimeout(() => {
      setTempSplash(false);
    }, 30000);
  }, []);

  // Get general weather data when location changes (URLs for forecast, hourly forecast, and observation stations)
  useEffect(() => {
    if (!location.latitude) return;
    setAlerts(null);
    // Time out after 30 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 30000);

    getWXData(location)
      .then((data) => {
        let county = data.county && data.county.split("/");
        setBaseData({
          localForecastUrl: data.forecast,
          hourlyForecastUrl: data.hourlyForecast,
          relativeLocation: {
            state: data.state,
            city: data.city,
          },
          observationStations: data.observationStations,
          countyZone: county[county.length - 1],
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [location]);

  // Get current Alerts
  useEffect(() => {
    if (!baseData.countyZone) return;
    getAlerts(baseData.countyZone)
      .then((data) => {
        setAlerts(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [baseData.countyZone]);

  // Once observation stations are loaded, get the closest station and set it as the weather station
  useEffect(() => {
    if (baseData.observationStations) {
      getWeatherStation(baseData.observationStations)
        .then((data) => {
          setWeatherStation(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [baseData.observationStations]);

  // Once weather station is loaded, get the current conditions and set them as currentObserved
  useEffect(() => {
    let intervalId;
    if (weatherStation) {
      const getCurrentWeather = () => {
        getCurrentConditions(weatherStation)
          .then((data) => {
            setCurrentObserved(data);
            setIsLoading(false); //`Remove loading spinner when changing location
            // Remove splash screen after at least 5 seconds
            if (timerComplete) {
              // If data took longer to load than 5 seconds, remove splash screen immediately
              setTempSplash(false);
            } else {
              // otherwise, remove splash screen after additional 5 seconds to ensure that splash screen doesn't just show a flash
              setTimeout(() => {
                setTempSplash(false);
              }, 5000);
            }
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };
      // Call the function once immediately
      getCurrentWeather();
      // Call the function every 5 minutes
      intervalId = setInterval(() => {
        getCurrentWeather();
      }, 300_000);
    }
    // Clean up interval if dependency changes or is unmounted
    return () => clearInterval(intervalId);
  }, [weatherStation]);

  // Add splash screen until data is loaded
  return tempSplash ? (
    <View style={AppStyles.splashContainer}>
      <Image
        source={require("./assets/weatherSplash.gif")}
        style={AppStyles.splashImage}
      />
    </View>
  ) : (
    <WeatherProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <MyTabs
          setTempSplash={setTempSplash}
          baseData={baseData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          location={location}
          setLocation={setLocation}
          currentObserved={currentObserved}
          alerts={alerts}
        />
        <View style={AppStyles.footer}>
          <Text style={AppStyles.footerText}>Data Sourced from NOAA</Text>
          <Image
            source={require("./assets/noaa-logo.png")}
            style={AppStyles.footerImg}
          />
        </View>
      </SafeAreaView>
    </WeatherProvider>
  );
}
