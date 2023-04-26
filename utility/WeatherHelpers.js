// Initial fetch to get base information for the app
export const getWXData = async (location) => {
  return new Promise(async (resolve, reject) => {
    fetch(
      `https://api.weather.gov/points/${location.latitude},${location.longitude}`
    )
      .then((response) => response.json())
      .then(async (locationWX) => {
        resolve({
          city: locationWX.properties.relativeLocation.properties.city,
          state: locationWX.properties.relativeLocation.properties.state,
          observationStations: locationWX.properties.observationStations,
          forecast: locationWX.properties.forecast,
          hourlyForecast: locationWX.properties.forecastHourly,
          forecastZone: locationWX.properties.forecastZone,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

// Retrieves hourly forecast data
export const getHourlyForecast = async (HourlyUrl) => {
  return new Promise(async (resolve, reject) => {
    await fetch(HourlyUrl)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.properties.periods);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const getWeatherStation = async (stationUrl) => {
  return new Promise(async (resolve, reject) => {
    await fetch(stationUrl)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.features[0].properties.stationIdentifier);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
// Retrieves current WX conditions for specified weather station
export const getCurrentConditions = async (weatherStation) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://api.weather.gov/stations/${weatherStation}/observations/latest`
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data.properties);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
};

// Retrieve 7 day forecast
export const getForecast = async (forecastUrl) => {
  return new Promise(async (resolve, reject) => {
    await fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        let forecast = data.properties.periods;
        resolve(forecast);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

// Retrieves alerts for specified forecast zone
export const getAlerts = async (forecastZone, callback) => {
  // forecastZone is a string like "https://api.weather.gov/zones/forecast/TNZ006" located in data.properties.forecastZone (from getWXData) which contains the zoneID (TNZ006). This is needed to get the alerts.

  let zoneID = forecastZone.split("/").pop();

  await fetch(`https://api.weather.gov/alerts/active/zone/${zoneID}`)
    .then((response) => response.json())
    .then((data) => {
      let alerts = data.features;
      if (alerts.length > 0) {
        return alerts;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Destructuring imports from utility/UtilityHelpers.js
// import { getWXData } from "../utility/UtilityHelpers";
