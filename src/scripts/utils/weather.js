document.getElementById("rem")?.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        const search_city = "https://geocoding-api.open-meteo.com/v1/search";
        const cityName = document.getElementById("rem").value;
        const date = new Date();

        fetch(`${search_city}?name=${cityName}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const lat = data.results[0].latitude;
                const lon = data.results[0].longitude;

                const timezone = data.results[0].timezone;
                timezone.replace("/", "%2F");

                const api_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,relativehumidity_2m,is_day,precipitation,rain,snowfall,windspeed_10m&hourly=cloudcover,temperature_2m&daily=rain_sum,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`;
                fetch(api_url)
                    .then(res => {
                        return res.json();
                    })
                    .then(d => {
                        const minutes = date.getMinutes();
                        const isday = d.current.is_day;
                        const cloudcover = d.hourly.cloudcover;
                        const timeandday = d.current.time.split("T");
                        const time = timeandday[1].toString().substr(0, 2);
                        const day = timeandday[0];
                        const rain = d.daily.rain_sum[0];
                        const humidity = d.current.relativehumidity_2m;
                        const currenttemp = d.current.temperature_2m;
                        const windspeed = d.current.windspeed_10m;
                        const minTemp = d.daily.temperature_2m_min[0];
                        const maxTemp = d.daily.temperature_2m_max[0];
                        const sunset = d.daily.sunset[0].split("T")[1];
                        const sunrise = d.daily.sunrise[0].split("T")[1];

                        document.querySelector(".weather").style.display = "block";
                        document.getElementById("city").innerHTML = cityName;
                        document.getElementById("currenttemp").innerHTML = "Current temperature: " + currenttemp + "°C";
                        document.getElementById("mintemp").innerHTML = "Minimum temperature: " + minTemp + "°C";
                        document.getElementById("maxtemp").innerHTML = "Maximum temperature: " + maxTemp + "°C";
                        document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
                        document.getElementById("time").innerHTML = `${time}:${minutes}`;
                        document.getElementById("day").innerHTML = day;
                        document.getElementById("wind").innerHTML = "Windspeed: " + windspeed + "Km/H";
                        document.getElementById("sunrise").innerHTML = "Sunrise: " + sunrise;
                        document.getElementById("sunset").innerHTML = "Sunset: " + sunset;
                        document.getElementById("rain").innerHTML = "Rain: " + rain + "mm";
                    })
                    .catch(error => console.log(error));
            });
    }
});
