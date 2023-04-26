// Import icons
import cloudy from "../assets/weatherIcons/cloudy.png";
import cloudy_night from "../assets/weatherIcons/night_cloud.png";
import fair from "../assets/weatherIcons/day_clear.png";
import fair_night from "../assets/weatherIcons/night_clear.png";
import overcast from "../assets/weatherIcons/overcast.png";
import fog from "../assets/weatherIcons/fog.png";
import sleet from "../assets/weatherIcons/day_sleet.png";
import sleet_night from "../assets/weatherIcons/night_sleet.png";
import rain from "../assets/weatherIcons/rain.png";
import thunderstorms from "../assets/weatherIcons/thunder.png";
import snow from "../assets/weatherIcons/snow.png";
import windy from "../assets/weatherIcons/wind.png";
import tornado from "../assets/weatherIcons/tornado.png";

// Objects to hold icon data
const icons = {
  bkn: cloudy,
  nbkn: cloudy_night,
  skc: fair,
  nskc: fair_night,
  few: cloudy,
  nfew: cloudy_night,
  sct: cloudy,
  nsct: cloudy_night,
  ovc: overcast,
  novc: overcast,
  fg: fog,
  nfg: fog,
  smoke: fog,
  fzra: sleet,
  ip: sleet_night,
  mix: sleet,
  nmix: sleet_night,
  raip: sleet,
  rasn: sleet,
  nrasn: sleet_night,
  shra: rain,
  tsra: thunderstorms,
  ntsra: thunderstorms,
  sn: snow,
  nsn: snow,
  wind: windy,
  nwind: windy,
  hi_shwrs: rain,
  hi_nshwrs: rain,
  fzrara: sleet,
  hi_tsra: thunderstorms,
  hi_ntsra: thunderstorms,
  ra1: rain,
  nra: rain,
  ra: rain,
  nsvrtsra: tornado,
  dust: fog,
  mist: fog,
  tsra_sct: thunderstorms,
  rain_showers: rain,
  rain: rain,
};

/* isDayTime is in forecast data  (at least for weekly)*/
export const getIcon = (url) => {
  // Split the url to grab the last part of the url
  let urlSplit = url.split("/");
  let urlEnd = urlSplit[urlSplit.length - 1];
  let iconString = "";
  // if there is a ',' in the url, remove it and everything after it
  if (urlEnd.includes(",")) {
    iconString = urlEnd.split(",")[0];
  } else {
    iconString = urlEnd.split("?")[0];
  }
  return icons[iconString];
};