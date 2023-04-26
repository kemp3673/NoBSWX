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

// Styles
import { homeStyles } from "../styles/styles";

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
  convertMeters,
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
        style={homeStyles.currentWrapper}
      >
        <View style={homeStyles.innerWrapper}>
          <View>
            <Text style={homeStyles.currentTemp} allowFontScaling={false}>
              {convertTemp(currentObserved.temperature.value)}
            </Text>
          </View>
          <Text style={homeStyles.currentDescription} allowFontScaling={false}>
            {currentObserved.textDescription}
          </Text>
          <Image
            style={homeStyles.currentIcon}
            source={getIcon(currentObserved.icon, context.isNight)}
            alt="weather icon"
          />
          <Text style={homeStyles.time} allowFontScaling={false}>
            {currentTime()}
          </Text>
          <Text style={homeStyles.boldText} allowFontScaling={false}>
            {relativeLocation.city}, {relativeLocation.state}
          </Text>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Visibility
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {convertMeters(currentObserved.visibility.value)} miles
            </Text>
          </View>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Wind Speed
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {convertKM(currentObserved.windSpeed.value)} mph
            </Text>
          </View>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Wind Direction
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {convertDirection(currentObserved.windDirection.value)}
            </Text>
          </View>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Humidity
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {currentObserved.relativeHumidity.value.toFixed(2)}%
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={homeStyles.currentWrapper}>
        <Text>Loading Current Weather...</Text>
      </View>
    );
  }
}
