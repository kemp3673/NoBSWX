import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { getCurrentConditions } from "../utility/WeatherHelpers";

export default function CurrentWX({ weatherStation }) {
  const [currentObserved, setCurrentObserved] = useState(null);
  console.log("CurrentWeather.js ran");
  useEffect(() => {
    getCurrentConditions(weatherStation, setCurrentObserved);
    console.log("Current Observed: ", currentObserved);
  }, []);

  const cardinalDirection = (degrees) => {
    switch (degrees) {
      case degrees >= 348.75 || degrees <= 11.25:
        return "N";
      case degrees >= 11.25 && degrees <= 33.75:
        return "NNE";
      case degrees >= 33.75 && degrees <= 56.25:
        return "NE";
      case degrees >= 56.25 && degrees <= 78.75:
        return "ENE";
      case degrees >= 78.75 && degrees <= 101.25:
        return "E";
      case degrees >= 101.25 && degrees <= 123.75:
        return "ESE";
      case degrees >= 123.75 && degrees <= 146.25:
        return "SE";
      case degrees >= 146.25 && degrees <= 168.75:
        return "SSE";
      case degrees >= 168.75 && degrees <= 191.25:
        return "S";
      case degrees >= 191.25 && degrees <= 213.75:
        return "SSW";
      case degrees >= 213.75 && degrees <= 236.25:
        return "SW";
      case degrees >= 236.25 && degrees <= 258.75:
        return "WSW";
      case degrees >= 258.75 && degrees <= 281.25:
        return "W";
      case degrees >= 281.25 && degrees <= 303.75:
        return "WNW";
      case degrees >= 303.75 && degrees <= 326.25:
        return "NW";
      case degrees >= 326.25 && degrees <= 348.75:
        return "NNW";
      default:
        return "N";
    }
  };

  const currentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };

  if (currentObserved) {
    return (
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1580737061343-bb08ed1a4e8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
        }}
        style={styles.currentWrapper}
      >
        <View style={styles.innerWrapper}>
          <Text style={styles.day}>Current Weather</Text>
          <Text style={styles.short}>{currentObserved.textDescription}</Text>
          <Image
            style={{
              height: 100,
              width: 100,
              resizeMode: "contain",
              borderWidth: 1,
              borderColor: "black",
            }}
            source={{ uri: currentObserved.icon }}
            alt="weather icon"
          />
          <Text style={styles.day}>
            {Math.round(currentObserved.temperature.value * (9 / 5) + 32)}
            {"\u2109"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>{currentTime()} </Text>
          <Text>
            Visibility{" "}
            <Text style={{ fontWeight: "bold" }}>
              {(currentObserved.visibility.value * 0.000621371).toFixed(2)}{" "}
              miles
            </Text>
          </Text>
          <Text>
            Wind Speed{" "}
            <Text style={{ fontWeight: "bold" }}>
              {(currentObserved.windSpeed.value * 0.621371).toFixed(2)} mph
            </Text>
          </Text>
          <Text>
            Wind Direction{" "}
            <Text style={{ fontWeight: "bold" }}>
              {cardinalDirection(currentObserved.windDirection.value)}
            </Text>
          </Text>
          <Text>
            Humidity{" "}
            <Text style={{ fontWeight: "bold" }}>
              {currentObserved.relativeHumidity.value.toFixed(2)}%
            </Text>
          </Text>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={styles.currentWrapper}>
        <Text style={styles.day}>Current Weather</Text>
        <Text style={styles.short}>Loading...</Text>
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
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "#012f47",
  },
  short: {
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: "bold",
    color: "#494a4a",
  },
});
