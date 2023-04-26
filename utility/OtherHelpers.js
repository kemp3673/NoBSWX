// Convert time from Unix to Day of Week and Time
export const convertTime = (timeCode) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timeCode);
  const day = date.getDay();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { day: daysOfWeek[day], time: timeString };
};

// Get current time
export const currentTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};

export const nightCheck = () => {
  let date = new Date();
  let hours = date.getHours();
  if (hours >= 18 || hours <= 6) {
    // Night
    return true;
  } else {
    // Day
    return false;
  }
};

// Convert temperature from Celsius to Fahrenheit
export const convertTemp = (temp) => {
  return `${Math.round(temp * (9 / 5) + 32)}°`;
};

// Convert wind speed from km to miles
export const convertKM = (kilometers) => {
  return `${Math.round(kilometers * 0.000621371).toFixed(2)}`;
};

// Convert wind direction from degrees to cardinal direction
export const convertDirection = (degrees) => {
  switch (degrees) {
    case degrees >= 348.75 || degrees <= 11.25:
      return "N";
    case degrees >= 11.25 && degrees <= 33.75:
      return "NNE";
    case degrees >= 33.75 && degrees <= 56.25:
      return "NE";
    case degrees >= 56.25 && degrees <= 78.75:
      return "ENE";
    case degrees >= 78.75 && degrees <= 101.25:
      return "E";
    case degrees >= 101.25 && degrees <= 123.75:
      return "ESE";
    case degrees >= 123.75 && degrees <= 146.25:
      return "SE";
    case degrees >= 146.25 && degrees <= 168.75:
      return "SSE";
    case degrees >= 168.75 && degrees <= 191.25:
      return "S";
    case degrees >= 191.25 && degrees <= 213.75:
      return "SSW";
    case degrees >= 213.75 && degrees <= 236.25:
      return "SW";
    case degrees >= 236.25 && degrees <= 258.75:
      return "WSW";
    case degrees >= 258.75 && degrees <= 281.25:
      return "W";
    case degrees >= 281.25 && degrees <= 303.75:
      return "WNW";
    case degrees >= 303.75 && degrees <= 326.25:
      return "NW";
    case degrees >= 326.25 && degrees <= 348.75:
      return "NNW";
    default:
      return "N";
  }
};

// Check if it is night time (used to determine background image)
export const isNight = () => {
  let date = new Date();
  let hours = date.getHours();
  if (hours >= 18 || hours <= 6) {
    return true;
  } else {
    return false;
  }
};

export const setRelativeLocation = async (relativeLocation, callback) => {};

// Update location used to get weather data
export const updateLocation = async (location, callback) => {};

// Get location from user input
export const getLocation = async (userLocation, callback) => {
  // If not zipcode, then add '+' between words
  await fetch(`https://geocode.maps.co/search?q=${userLocation}+US`)
    .then((response) => response.json())
    .then((data) => {
      //Set location state data[0].lat, data[0].lon
    })
    .catch((error) => {
      console.log(error);
    });
};

export const convertDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  return `${month + 1}/${day}`;
};

export const hiLo = (name) => {
  if (
    name.includes("Night") ||
    name.includes("Overnight") ||
    name.includes("Tonight")
  ) {
    return "Low";
  } else {
    return "High";
  }
};
