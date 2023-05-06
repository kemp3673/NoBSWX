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

// Ads
// import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

// Context
import { WeatherContext } from "../Context/WeatherContext";

// Helpers
import { getHourlyForecast } from "../utility/WeatherHelpers";
import { convertTime } from "../utility/OtherHelpers";
import { getIcon } from "../utility/IconHelpers";

export default function Hourly({ hourlyForecastUrl }) {
  const context = useContext(WeatherContext);
  const adUnitID = __DEV__
    ? "ca-app-pub-3940256099942544/6300978111"
    : "ca-app-pub-7186648467471890~8437973545";
  const [hourlyForecast, setHourlyForecast] = useState(null);

  useEffect(() => {
    // Initially clear the hourly forecast state
    setHourlyForecast(null);
    // If the hourly forecast url is passed in, get the hourly forecast
    if (hourlyForecastUrl) {
      getHourlyForecast(hourlyForecastUrl)
        .then((data) => {
          setHourlyForecast(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [hourlyForecastUrl]);

  if (!hourlyForecast) {
    return (
      <View style={styles.dailyContainer}>
        <Text style={styles.title}>Hourly Forecast</Text>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      // Break Sections out into their own components for readability and reusability as well as to reduce some of the unneeded code (e.g. repeated calls to convertTime when I can just do it once in the component and save to a variable)
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
            <View>
              {/* {(index + 1) % 10 == 0 ? (
                <View style={{ alignItems: "center", marginTop: 5 }}>
                  <AdMobBanner
                    bannerSize="smartBanner"
                    adUnitID={adUnitID}
                    onDidFailToReceiveAdWithError={(e) => console.log(e)}
                  />
                </View>
              ) : null} */}
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {convertTime(item.startTime).time == "12:00 AM" ? (
                  <View
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "95%",
                      flexDirection: "row",
                      backgroundColor: "rgba(0,0,0,1)",
                      marginBottom: 2,
                      borderRadius: 10,
                      padding: 5,
                      marginTop: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {convertTime(item.startTime).day}
                      {", "}
                      {convertTime(item.startTime).month}{" "}
                      {convertTime(item.startTime).date}
                      {", "}
                      {convertTime(item.startTime).year}
                    </Text>
                  </View>
                ) : null}
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
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      paddingLeft: 5,
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
                      <Text
                        style={{ color: "white", fontSize: 12, padding: 5 }}
                      >
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
