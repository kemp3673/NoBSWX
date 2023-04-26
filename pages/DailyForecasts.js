import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";

// Context
import { WeatherContext } from "../App";

// Helpers
import { getForecast } from "../utility/WeatherHelpers";
import { convertDate, hiLo } from "../utility/OtherHelpers";
import { getIcon } from "../utility/IconHelpers";

export default function DailyForecasts() {
  const context = useContext(WeatherContext);
  const [localForecast, setLocalForecast] = useState(null);

  useEffect(() => {
    if (context.localForecastUrl) {
      getForecast(context.localForecastUrl)
        .then((data) => {
          setLocalForecast(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [context.localForecastUrl]);

  // Add precip % to the forecast
  if (!localForecast) {
    return (
      <View style={styles.dailyContainer}>
        <Text style={styles.title}>7-Day Forecast</Text>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ImageBackground
        source={{
          uri: context.isNight
            ? "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            : "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=752&q=80",
        }}
        style={styles.dailyContainer}
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
          7-Day Forecast
        </Text>
        <FlatList
          data={localForecast}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: 10,
                  marginBottom: 2,
                  padding: 5,
                  marginTop: 5,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 0.75,
                    }}
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
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      {convertDate(item.startTime)}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1.25,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      {item.shortForecast}
                    </Text>
                  </View>

                  {hiLo(item.name) === "Low" ? (
                    <View
                      style={{
                        justifyContent: "center",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#74c3ed",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        {hiLo(item.name)}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        {item.temperature}°
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#74c3ed",
                          fontSize: 14,
                          color: "#b56969",
                          textAlign: "center",
                        }}
                      >
                        {hiLo(item.name)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {item.temperature}°
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    marginBottom: 5,
                    borderRadius: 10,
                    padding: 5,
                    paddingTop: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      height: 3,
                      width: "100%",
                      marginBottom: 5,
                    }}
                  />
                  <Text style={{ color: "white", fontSize: 14 }}>
                    {item.detailedForecast}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.number.toString()}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  dailyContainer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});
