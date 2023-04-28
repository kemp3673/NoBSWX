import { StyleSheet } from "react-native";

// Styles for App.js
export const AppStyles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  footer: {
    backgroundColor: "#012f47",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 8,
  },
  footerImg: {
    height: 20,
    resizeMode: "contain",
  },
});

// Styles for Home.js
export const homeStyles = StyleSheet.create({
  currentWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  innerWrapper: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 50,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  currentTemp: { color: "white", fontSize: 72, padding: 10 },
  currentDescription: { color: "white", fontSize: 42, padding: 10 },
  time: {
    fontWeight: "bold",
    color: "white",
    padding: 10,
    fontSize: 18,
  },
  conditionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  currentIcon: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});

// Styles for DailyForecasts.js
export const forecastStyles = StyleSheet.create({});

// Styles for Hourly.js
export const hourlyStyles = StyleSheet.create({});

// Styles for LocationChange.js
export const locationStyles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  background: {
    alignContent: "center",
    textAlign: "center",
    height: "100%",
    width: "100%",
  },
  container: {
    flexDirection: "column",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  queryWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  text: { color: "white", fontSize: 16 },
  savedContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  savedWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",

    borderColor: "green",
    borderWidth: 1,
  },
  label: {
    color: "white",
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  savedScroll: {
    maxHeight: 200,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "white",
    margin: 10,
    width: "80%",
  },
});

// Styles for Radar.js
export const RadarStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: "black",
  },
  zoomLevel: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
