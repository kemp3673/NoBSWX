import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  ImageBackground,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

// Helpers
import {
  getLocation,
  saveLocations,
  deleteSavedLocation,
  getSavedLocations,
} from "../utility/OtherHelpers";

// Styles
import { locationStyles } from "../styles/styles";

// Context
import { WeatherContext } from "../App";

export default function LocationChange() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    getSavedLocations().then((data) => {
      setSavedLocations(data);
    });
  }, []);

  const navigation = useNavigation();
  const context = useContext(WeatherContext);

  const handleSubmit = () => {
    getLocation(zipCode).then((data) => {
      // Save location to AsyncStorage
      saveLocations(data);
      // Set location in context
      context.setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
    // Needs a loading screen while waiting for data
    // State value of isLoading that is set to true when handleSubmit is called, then set to false when data is returned. Once false, navigate to Home, if true, show loading indicator

    // Navigate to Home screen
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      }}
      style={locationStyles.background}
    >
      <View style={locationStyles.container}>
        <View style={locationStyles.queryWrapper}>
          <Text style={locationStyles.label}>Enter ZipCode</Text>
          <TextInput
            style={locationStyles.input}
            type="postal-code"
            textContentType="postalCode"
            autoComplete="postal-code"
            keyboardType="numeric"
            maxLength={5}
            placeholder="Enter Zip Code"
            onChangeText={(text) => setZipCode(text)}
            value={zipCode}
          />
        </View>
        <Button
          color="#74c3ed"
          title="Add Location"
          accessibilityLabel="Add location to saved places"
          onPress={() => {
            handleSubmit();
          }}
        />
        <View style={locationStyles.savedContainer}>
          <View style={locationStyles.divider} />
          <Text style={locationStyles.label}>Saved Locations</Text>
          {/* <ScrollView style={locationStyles.savedScroll}> */}
          {/* Will be a FlatList once data is saved */}
          <View style={locationStyles.savedWrapper}>
            {savedLocations.length === 0 ? (
              <Text style={locationStyles.text}>No Saved Locations</Text>
            ) : (
              <FlatList
                data={savedLocations}
                renderItem={({ item }) => (
                  <View style={locationStyles.location}>
                    <Text
                      style={locationStyles.text}
                      onPress={() => {
                        console.log(`${item.name} Pressed`);
                      }}
                    >
                      {item.name.split(",")[0]}
                      {", "}
                      {item.name.split(",")[1].includes("County")
                        ? item.name.split(",")[2]
                        : item.name.split(",")[1]}
                    </Text>
                    <MaterialIcons
                      name="delete"
                      size={20}
                      color="#74c3ed"
                      onPress={() => {
                        console.log(`${item.name} Delete pressed`);
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.name}
              />
            )}
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </ImageBackground>
  );
}
