import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";

// Context
import { WeatherContext } from "../App";

// Helpers
import {
  getWeatherStation,
  getCurrentConditions,
} from "../utility/WeatherHelpers";
import { getIcon } from "../utility/IconHelpers";

import {
  nightCheck,
  convertTemp,
  convertKM,
  currentTime,
  convertDirection,
} from "../utility/OtherHelpers";

export default function Home() {
  const context = useContext(WeatherContext);
  const relativeLocation = context.relativeLocation;
  const observationStations = context.observationStations;

  const [weatherStation, setWeatherStation] = useState(null);
  const [currentObserved, setCurrentObserved] = useState(null);

  useEffect(() => {
    if (observationStations) {
      getWeatherStation(observationStations)
        .then((data) => {
          setWeatherStation(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [observationStations]);

  useEffect(() => {
    if (weatherStation) {
      getCurrentConditions(weatherStation)
        .then((data) => {
          setCurrentObserved(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [weatherStation]);

  if (currentObserved) {
    return (
      <ImageBackground
        source={{
          uri: context.isNight
            ? "https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            : "https://images.unsplash.com/photo-1580737061343-bb08ed1a4e8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
        }}
        style={styles.currentWrapper}
      >
        <View style={styles.innerWrapper}>
          <View>
            <Text
              style={{ color: "white", fontSize: 72, padding: 10 }}
              allowFontScaling={false}
            >
              {convertTemp(currentObserved.temperature.value)}
            </Text>
          </View>
          <Text
            style={{ color: "white", fontSize: 42, padding: 10 }}
            allowFontScaling={false}
          >
            {currentObserved.textDescription}
          </Text>
          <Image
            style={{
              height: 100,
              width: 100,
              resizeMode: "contain",
            }}
            source={getIcon(currentObserved.icon)}
            alt="weather icon"
          />
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              padding: 10,
              fontSize: 18,
            }}
            allowFontScaling={false}
          >
            {currentTime()}
          </Text>
          <Text
            style={{ color: "white", fontSize: 18, paddingBottom: 10 }}
            allowFontScaling={false}
          >
            {relativeLocation.city}, {relativeLocation.state}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
              }}
              allowFontScaling={false}
            >
              Visibility
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 24,
              }}
              allowFontScaling={false}
            >
              {convertKM(currentObserved.visibility.value)} miles
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              width: "100%",
            }}
          >
            <Text
              style={{ color: "white", fontSize: 24 }}
              allowFontScaling={false}
            >
              Wind Speed
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 24, color: "white" }}
              allowFontScaling={false}
            >
              {convertKM(currentObserved.windSpeed.value)} mph
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              width: "100%",
            }}
          >
            <Text
              style={{ color: "white", fontSize: 24 }}
              allowFontScaling={false}
            >
              Wind Direction
            </Text>
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 24 }}
              allowFontScaling={false}
            >
              {convertDirection(currentObserved.windDirection.value)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              width: "100%",
            }}
          >
            <Text
              style={{ color: "white", fontSize: 24 }}
              allowFontScaling={false}
            >
              Humidity
            </Text>
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 24 }}
              allowFontScaling={false}
            >
              {currentObserved.relativeHumidity.value.toFixed(2)}%
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={styles.currentWrapper}>
        <Text>Loading Current Weather...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  innerWrapper: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
