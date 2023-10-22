import { writeFileSync } from "fs";

const api_url = "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"

async function get_data(url) {
    const res = await fetch(url);
    const data = await response.json();

    writeFileSync("data/insight.json", JSON.stringify(data, null, 4));
}

get_data(api_url);
