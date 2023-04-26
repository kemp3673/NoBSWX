import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

// Helpers
import { getWXData } from "../utility/WeatherHelpers";

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
import Radar from "../pages/Radar";
import LocationChange from "../pages/LocationChange";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
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
        {() => <LocationChange />}
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
        {() => <Home />}
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
        {() => <DailyForecasts />}
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
        {() => <Hourly />}
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
        {() => <Radar />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
