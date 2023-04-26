import React, { useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import { locationStyles } from "../styles/styles";

export default function LocationChange() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      }}
      style={locationStyles.background}
    >
      <View style={locationStyles.container}>
        {/* <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "white",
              padding: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Enter City and State
          </Text>
          <TextInput
            style={styles.input}
            type="text"
            textContentType="addressCity"
            placeholder="Enter City"
            onChangeText={(text) => setCity(text)}
            value={city}
          />
          <TextInput
            style={styles.input}
            type="text"
            textContentType="addressState"
            placeholder="Enter State ex. 'TN'"
            onChangeText={(text) => setState(text)}
            maxLength={2}
            value={state}
          />
        </View> */}
        <View style={locationStyles.queryWrapper}>
          {/* <Text
            style={{
              color: "white",
              margin: 10,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            OR
          </Text> */}
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
            console.log("Submit Pressed");
          }}
        />
        <View style={locationStyles.savedContainer}>
          <View style={locationStyles.divider} />
          <Text style={locationStyles.label}>Saved Locations</Text>
          <ScrollView style={locationStyles.savedScroll}>
            {/* Will be a FlatList once data is saved */}
            <View style={locationStyles.savedWrapper}>
              <View style={locationStyles.location}>
                <Text
                  style={locationStyles.text}
                  onPress={() => {
                    console.log("Nashville pressed");
                  }}
                >
                  Nashville, TN
                </Text>
                <MaterialIcons
                  name="delete"
                  size={20}
                  color="#74c3ed"
                  onPress={() => {
                    console.log("Nashville delete pressed");
                  }}
                />
              </View>
              <View style={locationStyles.location}>
                <Text
                  style={locationStyles.text}
                  onPress={() => {
                    console.log("Franklin pressed");
                  }}
                >
                  Franklin, TN
                </Text>
                <MaterialIcons
                  name="delete"
                  size={20}
                  color="#74c3ed"
                  onPress={() => {
                    console.log("Franklin delete pressed");
                  }}
                />
              </View>
              <View style={locationStyles.location}>
                <Text
                  style={locationStyles.text}
                  onPress={() => {
                    console.log("Brentwood pressed");
                  }}
                >
                  Brentwood, TN
                </Text>
                <MaterialIcons
                  name="delete"
                  size={20}
                  color="#74c3ed"
                  onPress={() => {
                    console.log("Brentwood delete pressed");
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}
