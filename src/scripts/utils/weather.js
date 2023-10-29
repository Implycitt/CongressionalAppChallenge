document.getElementById("rem")?.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        const search_city = "https://geocoding-api.open-meteo.com/v1/search";
        const cityName = document.getElementById("rem").value;

        fetch(`${search_city}?name=${cityName}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const lat = data.results[0].latitude;
                const lon = data.results[0].longitude;

                const timezone = data.results[0].timezone;
                timezone.replace("/", "%2F");

                const api_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relativehumidity_2m,is_day,precipitation,rain,snowfall,windspeed_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`;
                fetch(api_url)
                    .then(res => {
                        return res.json();
                    })
                    .then(d => {
                        console.log(d);
                    })
                    .catch(error => console.log(error));
            });
    }
});
