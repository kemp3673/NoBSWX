import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
// Icons
import { Entypo } from "@expo/vector-icons";
// Styles
import { RadarStyles } from "../styles/styles";
// Context
import { WeatherContext } from "../App";

const k = "8ec879ca39768d40c5ce53f1989bca64";

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];

const getTileCoords = (zoom, center) => {
  const latRad = (center.latitude * Math.PI) / 180;
  const n = 2.0 ** zoom;
  const x = Math.floor(((center.longitude + 180.0) / 360.0) * n);
  const y = Math.floor(
    ((1.0 - Math.log(Math.tan(latRad) + 1.0 / Math.cos(latRad)) / Math.PI) /
      2.0) *
      n
  );
  return { x, y };
};

export default function Radar() {
  const mapRef = useRef(null);
  const context = useContext(WeatherContext);
  location = context.location;

  const [zoomLevel, setZoomLevel] = useState(0);
  const [center, setCenter] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const precipitationUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${k}`;
  const cloudsUrl = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${k}`;

  const handleRegionChange = (region) => {
    const { latitude, longitude, latitudeDelta } = region;
    const zoomLevel = Math.round(Math.log2(360 / latitudeDelta));
    const center = { latitude, longitude };
    setZoomLevel(zoomLevel);
    setCenter(center);
  };

  const { x, y } = getTileCoords(zoomLevel, center);
  return (
    <View style={RadarStyles.container}>
      {center.latitude !== 0 && center.longitude !== 0 && (
        <View style={{ position: "relative", flex: 1 }}>
          <MapView
            style={RadarStyles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            showScale={true}
            showsCompass={true}
            loadingEnabled={true}
            showsScale={true}
            mapType="mutedStandard"
            userInterfaceStyle="dark"
            onRegionChange={handleRegionChange}
            customMapStyle={mapStyle}
            ref={mapRef}
          >
            {cloudsUrl && (
              <UrlTile
                urlTemplate={cloudsUrl}
                zIndex={-1}
                opacity={0.3}
                maximumZ={19}
                tileSize={256}
                key={`clouds-${zoomLevel}-${x}-${y}`}
                tileUrlTemplate={cloudsUrl
                  .replace("{x}", "{x}")
                  .replace("{y}", "{y}")
                  .replace("{z}", "{z}")}
              />
            )}
            {precipitationUrl && (
              <UrlTile
                urlTemplate={precipitationUrl}
                zIndex={-2}
                maximumZ={19}
                tileSize={256}
                key={`precipitation-${zoomLevel}-${x}-${y}`}
                tileUrlTemplate={precipitationUrl
                  .replace("{x}", "{x}")
                  .replace("{y}", "{y}")
                  .replace("{z}", "{z}")}
              />
            )}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"Current Location"}
              description={"Location accuracy dependant on device settings"}
            >
              <Entypo name="location-pin" size={24} color="#40e9f5" />
            </Marker>
          </MapView>

          <Image
            style={{
              width: 75,
              height: 30,
              resizeMode: "contain",
              position: "absolute",
              bottom: Platform.OS == "ios" ? 20 : 2,
              right: 1,
            }}
            source={require("../assets/openWeatherLogo.png")}
          />
        </View>
      )}
    </View>
  );
}
