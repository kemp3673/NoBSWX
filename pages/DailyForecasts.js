import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

// Context
import { WeatherContext } from "../Context/WeatherContext";

// Helpers
import { getForecast } from "../utility/WeatherHelpers";
import { convertDate, hiLo } from "../utility/OtherHelpers";
import { getIcon } from "../utility/IconHelpers";

// Icons
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Ads
// import { AdMobBanner } from "expo-ads-admob";

export default function DailyForecasts({ localForecastUrl, alerts }) {
  const context = useContext(WeatherContext);
  const [localForecast, setLocalForecast] = useState(null);
  // Toggle the alerts
  const [showAlerts, setShowAlerts] = useState(false);
  // Animation for the alerts
  const fadeAnim = new Animated.Value(0);

  const adUnitID = "ca-app-pub-3940256099942544/6300978111";

  // Handle the fade in animation for the alerts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Get the local forecast
  useEffect(() => {
    if (localForecastUrl) {
      getForecast(localForecastUrl)
        .then((data) => {
          setLocalForecast(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [localForecastUrl]);

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
            <View>
              {alerts && alerts.length > 0 && index == 0 ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShowAlerts(!showAlerts);
                  }}
                >
                  <Animated.View
                    style={{
                      opacity: fadeAnim,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        borderRadius: 10,
                        borderColor: "orange",
                        borderWidth: 1,
                        marginBottom: 2,
                        padding: 5,
                        marginTop: 5,
                        width: "95%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "orange",
                        }}
                      >
                        {showAlerts ? alerts[0].properties.event : "ALERT"}
                      </Text>
                      {showAlerts ? null : (
                        <Entypo name="chevron-down" size={24} color="orange" />
                      )}
                      {showAlerts ? (
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            padding: 5,
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {alerts[0].properties.description}
                        </Text>
                      ) : null}
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              ) : null}
              {/* {(index + 1) % 6 == 0 ? (
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
