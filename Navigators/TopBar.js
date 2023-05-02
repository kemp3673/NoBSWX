import React, { useState, useEffect, Suspense, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

// Helpers
import {
  getWXData,
  getWeatherStation,
  getCurrentConditions,
} from "../utility/WeatherHelpers";
import { nightCheck } from "../utility/OtherHelpers";

// Link context
import { WeatherContext } from "../Context/WeatherContext";

// Icons
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

// Components
import Home from "../pages/Home";
import DailyForecasts from "../pages/DailyForecasts";
import Hourly from "../pages/Hourly";
const Radar = React.lazy(() => import("../pages/Radar"));
import LocationChange from "../pages/LocationChange";

const Tab = createMaterialTopTabNavigator();

function MyTabs({
  baseData,
  isLoading,
  setIsLoading,
  setTempSplash,
  location,
  setLocation,
  currentObserved,
}) {
  const context = useContext(WeatherContext);
  // Check if it's night time and set the context
  useEffect(() => {
    context.setIsNight(new Date().getHours() > 18 || new Date().getHours() < 6);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 10,
          color: "white",
        },
        tabBarStyle: {
          backgroundColor: "#012f47",
          height: 50,
          justifyContent: "center",
        },
      }}
      initialRouteName="Home"
      backBehavior="history"
    >
      <Tab.Screen
        name="Location"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarOptions: {
            showIcon: true,
          },
          tabBarIcon: ({ focused }) => {
            let color = focused ? "gray" : "white";
            return <FontAwesome name="search" size={20} color={color} />;
          },
        }}
      >
        {() => (
          <LocationChange
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setLocation={setLocation}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarOptions: {
            showIcon: true,
          },
          tabBarIcon: ({ focused }) => {
            let color = focused ? "gray" : "white";
            return <Ionicons name="home" size={20} color={color} />;
          },
        }}
      >
        {() => (
          <Home
            relativeLocation={baseData.relativeLocation}
            currentObserved={currentObserved}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Daily"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarOptions: {
            showIcon: true,
          },
          tabBarIcon: ({ focused }) => {
            let color = focused ? "gray" : "white";
            return <FontAwesome5 name="calendar-day" size={20} color={color} />;
          },
        }}
      >
        {() => <DailyForecasts localForecastUrl={baseData.localForecastUrl} />}
      </Tab.Screen>
      <Tab.Screen
        name="Hourly"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarOptions: {
            showIcon: true,
          },
          tabBarIcon: ({ focused }) => {
            let color = focused ? "gray" : "white";
            return <AntDesign name="clockcircle" size={20} color={color} />;
          },
        }}
      >
        {() => <Hourly hourlyForecastUrl={baseData.hourlyForecastUrl} />}
      </Tab.Screen>
      <Tab.Screen
        name="Radar"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarOptions: {
            showIcon: true,
          },
          tabBarIcon: ({ focused }) => {
            let color = focused ? "gray" : "white";
            return (
              <MaterialCommunityIcons name="radar" size={20} color={color} />
            );
          },
        }}
      >
        {() => (
          <React.Suspense fallback={<View />}>
            <Radar location={location} />
          </React.Suspense>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App(props) {
  return (
    <NavigationContainer>
      <MyTabs
        setTempSplash={props.setTempSplash}
        baseData={props.baseData}
        isLoading={props.isLoading}
        setIsLoading={props.setIsLoading}
        location={props.location}
        setLocation={props.setLocation}
        currentObserved={props.currentObserved}
      />
    </NavigationContainer>
  );
}
