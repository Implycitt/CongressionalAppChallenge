var fs = require("fs");
const api_key = fs.readFileSync("api_key.txt").toString('utf-8');
const api_url = "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"

async function get_data(url) {
    
    const response = await fetch(url);
    var data = await response.json();
    fs.writeFileSync("data/insight.json", JSON.stringify(data, null, 4));
}

get_data(api_url)