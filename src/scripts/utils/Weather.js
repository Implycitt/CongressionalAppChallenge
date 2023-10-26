/* create weather calls using the key that will be stored in .env and have the data stored into a json file that goes in src/assets/json directory*/

import { writeFileSync } from "fs";

const search_city = "https://geocoding-api.open-meteo.com/v1/search";

var cityName = document.querySelector(".search input").value;

const response = await fetch(search_city+`?name=${cityName}`);
const data = await response.json();
writeFileSync("../..assets/json/weather.json", JSON.stringify(data, null, 4));

file = "../..assets/json/weather.json";

var lat = JSON.parse(file).latitude;
var lon = JSON.parse(file).longitude;

const api_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relativehumidity_2m,is_day,precipitation,rain,snowfall,windspeed_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`;

async function get_data(url) {
    const res = await fetch(url);
    const data = await response.json();

    writeFileSync("../../assets/json/weather.json", JSON.stringify(data, null, 4));
}

get_data(api_url);
