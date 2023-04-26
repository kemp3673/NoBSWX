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

export default function LocationChange() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  console.log("LocationChange.js ran");

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      }}
      style={{
        alignContent: "center",
        textAlign: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
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
            style={{
              width: "80%",
              margin: 10,
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 5,
              padding: 5,
            }}
            type="text"
            textContentType="addressCity"
            placeholder="Enter City"
            onChangeText={(text) => setCity(text)}
            value={city}
          />
          <TextInput
            style={{
              width: "80%",
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 5,
              padding: 5,
            }}
            type="text"
            textContentType="addressState"
            placeholder="Enter State ex. 'TN'"
            onChangeText={(text) => setState(text)}
            maxLength={2}
            value={state}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "white",
              margin: 10,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            OR
          </Text>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Enter ZipCode
          </Text>
          <TextInput
            style={{
              width: "80%",
              margin: 10,
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 5,
              padding: 5,
            }}
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
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              height: 2,
              backgroundColor: "white",
              margin: 10,
              width: "80%",
            }}
          />
          <Text
            style={{
              color: "white",
              margin: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Saved Locations
          </Text>
          <ScrollView
            style={{
              maxHeight: 200,
            }}
          >
            {/* Will be a FlatList once data is saved */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%",
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16 }}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%",
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16 }}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%",
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16 }}
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
