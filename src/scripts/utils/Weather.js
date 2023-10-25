/* create weather calls using the key that will be stored in .env and have the data stored into a json file that goes in src/assets/json directory*/

import { writeFileSync } from "fs";

const search_city = "https://geocoding-api.open-meteo.com/v1/search";

async function get_city(url, name) {
    const response = await fetch(url+`?name=${name}`);
}

const api_url = ""

document.write('')

async function get_data(url) {
    const res = await fetch(url);
    const data = await response.json();

    writeFileSync("../../assets/json/weather.json", JSON.stringify(data, null, 4));
}

get_data(api_url);
