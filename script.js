const apiKey = 'ee8caa7f7ce35e28a0354169328c8fce'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const errorMessage = document.getElementById('error-message');

const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('get-weather');
const weatherIcon = document.getElementById('weather-icon');
const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim().toLowerCase(); // Trim and lowercase input

    // Check if the input is a valid Indian state or union territory
    const indianStatesAndUTs = [
        "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh",
        "goa", "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka",
        "kerala", "madhya pradesh", "maharashtra", "manipur", "meghalaya",
        "mizoram", "nagaland", "odisha", "punjab", "rajasthan", "sikkim",
        "tamil nadu", "telangana", "tripura", "uttar pradesh", "uttarakhand",
        "west bengal", "andaman and nicobar islands", "chandigarh", "dadra and nagar haveli",
        "daman and diu", "delhi", "lakshadweep", "puducherry"
    ];
    if (!indianStatesAndUTs.includes(city)) {
        errorMessage.textContent = "Please enter a valid Indian state or union territory.";
        return;
    }

    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear previous data
            locationEl.textContent = "";
            tempEl.textContent = "";
            descriptionEl.textContent = "";
            weatherIcon.src = "";

            console.log(data); // Log the data to the console for debugging

            locationEl.textContent = data.name;
            tempEl.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionEl.textContent = data.weather[0].description;

            // Set weather icon based on the weather condition
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            errorMessage.textContent = ""; // Clear the error message if successful
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorMessage.textContent = "Error fetching weather data. Please try again later.";
        });
});