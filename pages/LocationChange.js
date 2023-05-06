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
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
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

export default function LocationChange({
  isLoading,
  setIsLoading,
  setLocation,
  relativeLocation,
}) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [trashSelected, setTrashSelected] = useState(null);

  useEffect(() => {
    getSavedLocations().then((data) => {
      setSavedLocations(data);
    });
  }, []);

  const navigation = useNavigation();

  const handleSubmit = () => {
    setIsLoading(true);
    getLocation(zipCode)
      .then((data) => {
        // Save location to AsyncStorage
        saveLocations(data).then((data) => {
          getSavedLocations(data).then((data) => {
            setSavedLocations(data);
          });
        });
        // Set location in context
        setLocation({
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        alert("There was a problem getting the weather. Please try again.");
      });
  };

  useEffect(() => {
    if (isLoading === false) {
      navigation.navigate("Home");
      setSelected(null);
      setZipCode("");
    }
  }, [isLoading]);

  const handleDelete = (item) => {
    setTrashSelected(item);
    deleteSavedLocation(item)
      .then((data) => {
        getSavedLocations(data).then((amended) => {
          setSavedLocations(amended);
        });
      })
      .catch((error) => {
        console.error(error);
        alert("There was a problem deleting the location. Please try again.");
      })
      .finally(() => {
        setTrashSelected(null);
      });
  };

  const handleSelect = (item) => {
    // let name = item.name.split(", ");
    // if (name[0] == relativeLocation.city && name[1] == relativeLocation.state) {
    //   alert("You are already viewing this location.");
    //   return;
    // }
    setSelected(item);
    setIsLoading(true);
    setLocation({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      }}
      style={locationStyles.background}
    >
      {/* <KeyboardAvoidingView style={locationStyles.container} behavior="padding"> */}
      <KeyboardAvoidingView
        style={{
          flex: 1,
          position: "absolute",
          top: "15%",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        behavior="padding"
      >
        {/* <View style={locationStyles.container} behavior="padding"> */}
        <Spinner
          visible={isLoading}
          textStyle={locationStyles.spinnerTextStyle}
        />
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
        <View style={locationStyles.container}>
          <Button
            color="#74c3ed"
            title="Add Location"
            accessibilityLabel="Add location to saved places"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
        <View style={locationStyles.savedContainer}>
          <View style={locationStyles.divider} />
          <Text style={locationStyles.label}>Saved Locations</Text>
          {savedLocations.length === 0 ? (
            <Text style={locationStyles.text}>No Saved Locations</Text>
          ) : (
            <FlatList
              style={{ alignSelf: "center" }}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              width="80%"
              data={savedLocations}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={locationStyles.location}>
                  <Text
                    style={{
                      color:
                        // Color of selected location
                        selected === item
                          ? "#74c3ed"
                          : // Color if location is current location
                          item.name.split(", ")[0] == relativeLocation.city &&
                            item.name.split(", ")[1] == relativeLocation.state
                          ? "#ababab"
                          : // Color of other locations
                            "white",
                    }}
                    // Disable onPress if location is current location to prevent re-render or hanging on loading screen
                    onPress={() => {
                      if (
                        item.name.split(", ")[0] == relativeLocation.city &&
                        item.name.split(", ")[1] == relativeLocation.state
                      ) {
                        return;
                      } else {
                        handleSelect(item);
                      }
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
                    color={trashSelected == item ? "red" : "#74c3ed"}
                    onPress={() => {
                      handleDelete(item);
                    }}
                  />
                </View>
              )}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
