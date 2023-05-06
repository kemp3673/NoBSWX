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
import { WeatherContext } from "../Context/WeatherContext";

// Helpers
import {
  getWeatherStation,
  getCurrentConditions,
} from "../utility/WeatherHelpers";
import { getIcon } from "../utility/IconHelpers";

// Icons
import { Ionicons } from "@expo/vector-icons";

import {
  nightCheck,
  convertTemp,
  convertKM,
  currentTime,
  convertDirection,
  convertMeters,
} from "../utility/OtherHelpers";

export default function Home({
  observationStations,
  relativeLocation,
  currentObserved,
  alerts,
}) {
  // Link context
  const context = useContext(WeatherContext);
  // Local state

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
              {currentObserved.temperature.value
                ? convertTemp(currentObserved.temperature.value)
                : "N/A"}
            </Text>
          </View>
          <Image
            style={homeStyles.currentIcon}
            source={getIcon(currentObserved.icon, context.isNight)}
            alt="weather icon"
          />
          <Text style={homeStyles.currentDescription} allowFontScaling={false}>
            {currentObserved.textDescription
              ? currentObserved.textDescription
              : "Unable to get current conditions"}
          </Text>
          {alerts !== null ? (
            <View style={homeStyles.alertWrapper}>
              <Ionicons name="alert-circle" size={24} color="orange" />
              <Text style={homeStyles.alertText} allowFontScaling={false}>
                {alerts.length > 1
                  ? `${alerts.length} ALERTS IN YOUR AREA`
                  : alerts[0].properties.headline}
              </Text>
            </View>
          ) : null}
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
              {currentObserved.visibility.value
                ? convertMeters(currentObserved.visibility.value)
                : "Unknown"}{" "}
              miles
            </Text>
          </View>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Wind Speed
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {currentObserved.windSpeed.value
                ? convertKM(currentObserved.windSpeed.value)
                : 0.0}{" "}
              mph
            </Text>
          </View>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Wind Direction
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {currentObserved.windDirection.value
                ? convertDirection(currentObserved.windDirection.value)
                : "N/A"}
            </Text>
          </View>
          <View style={homeStyles.conditionsWrapper}>
            <Text style={homeStyles.text} allowFontScaling={false}>
              Humidity
            </Text>
            <Text style={homeStyles.boldText} allowFontScaling={false}>
              {currentObserved.relativeHumidity.value
                ? currentObserved.relativeHumidity.value.toFixed(2)
                : 0.0}
              %
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
