import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

// Context
import { WeatherContext } from "../App";

// Helpers
import { getHourlyForecast } from "../utility/WeatherHelpers";
import { convertTime } from "../utility/OtherHelpers";
import { getIcon } from "../utility/IconHelpers";

export default function Hourly() {
  const context = useContext(WeatherContext);

  const [hourlyForecast, setHourlyForecast] = useState(null);

  useEffect(() => {
    if (context.hourlyForecastUrl) {
      getHourlyForecast(context.hourlyForecastUrl)
        .then((data) => {
          setHourlyForecast(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [context.hourlyForecastUrl]);

  if (!hourlyForecast) {
    return (
      <View style={styles.dailyContainer}>
        <Text style={styles.title}>Hourly Forecast</Text>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ImageBackground
        source={{
          uri: context.isNight
            ? "https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
            : "https://images.unsplash.com/photo-1516912481808-3406841bd33c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=744&q=80",
        }}
        style={styles.hourlyContainer}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            padding: 5,
            textAlign: "center",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.3)",
            width: "100%",
          }}
        >
          Hourly Forecast
        </Text>
        <FlatList
          data={hourlyForecast}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "95%",
                  flexDirection: "row",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  marginBottom: 2,
                  borderRadius: 10,
                  padding: 5,
                  marginTop: 5,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    source={getIcon(item.icon)}
                    alt="image"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {convertTime(item.startTime).day}
                  </Text>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {convertTime(item.startTime).time}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {item.shortForecast}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 12, padding: 5 }}>
                      <Fontisto name="blood-drop" size={12} color="white" />
                      {"  "}
                      {item.probabilityOfPrecipitation.value}%
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      <Fontisto name="wind" size={10} color="white" />{" "}
                      {item.windDirection}
                      {`\n`}
                      {item.windSpeed}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#74c3ed",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    {item.temperature}°
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.number}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  hourlyContainer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
  },
});
