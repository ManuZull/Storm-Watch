const API_KEY = "1ff8e50dca959c16e78209dad010425c"; // API key for accessing the weather data

const button = document.getElementById("searchButton"); // Get the search button element
const input = document.getElementById("inputSearch"); // Get the input field for the city name
const select = document.getElementById("select"); // Get the select element for unit of measurement

// Retrieve saved data from local storage and parse it
const dataLocalStorage = JSON.parse(localStorage.getItem("savedData"));

// If there is saved data, create city and weather details
if (dataLocalStorage != null) {
    createH2City(dataLocalStorage); // Create heading with city name
    createWeatherDetails(dataLocalStorage); // Create weather details
}

// Add event listener for button click
button.addEventListener("click", () => {
    searchCity(input.value, select.value); // Call searchCity function with input value and selected unit
});

// Function to search for a city and fetch weather data
function searchCity(city, unit) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`)
    .then(function(response) {
        console.log(response); // Log the response
        return response.json(); // Parse the response to JSON
    })
    .then(function(parsedResponse) {
        console.log(parsedResponse); // Log the parsed response
        saveData(parsedResponse); // Save data to local storage
        // Remove existing container elements if they exist
        if (document.querySelector("#divContainer")) {
            document.querySelector("#divContainer").remove();
            document.querySelector("#divDetails").remove();            
        }
        createH2City(parsedResponse); // Create heading with city name
        createWeatherDetails(parsedResponse); // Create weather details
    })
    .catch(function(error) {
        console.log('There was a problem with the Fetch request: ' + error.message); // Log any errors
    });
}

// Function to save data to local storage
function saveData(data) {
    localStorage.setItem("savedData", JSON.stringify(data)); // Convert data to JSON and save it
}

// Function to create a heading with the city name
function createH2City(name) {
    let cityName = document.createElement("h2"); // Create an h2 element
    cityName.setAttribute("id", "h2"); // Set the id attribute
    cityName.innerHTML = `${name.name}`; // Set the inner HTML to the city name
    let container = document.getElementById("auxiliar"); // Get the auxiliary container
    let divContainer = document.createElement("div"); // Create a div container
    divContainer.setAttribute("id", "divContainer"); // Set the id attribute
    divContainer.setAttribute("class", "col-12 col-md-6"); // Set the class attribute
    
    let temperature = document.createElement("p"); // Create a paragraph for temperature
    temperature.setAttribute("class", "temperature"); // Set the class attribute
    temperature.innerHTML = `<span>${name.main.temp}°</span>`; // Set the inner HTML to the temperature

    divContainer.append(cityName, temperature); // Append the city name and temperature to the container
    container.appendChild(divContainer); // Append the div container to the main container

    // Set the background image of the city name based on the weather icon
    cityName.style.background = `url(https://openweathermap.org/img/wn/${name.weather[0].icon}@2x.png) no-repeat top`;
}

// Function to create weather details
function createWeatherDetails(details) {
    let container = document.getElementById("auxiliar"); // Get the auxiliary container
    let divDetails = document.createElement("div"); // Create a div for weather details
    divDetails.setAttribute("id", "divDetails"); // Set the id attribute
    divDetails.setAttribute("class", "col-12 col-md-6"); // Set the class attribute

    // Create a paragraph for feels like temperature
    let sensation = document.createElement("p");
    sensation.innerHTML = `Feels like: ${details.main.feels_like}°`; // Set the inner HTML to feels like temperature

    // Create a paragraph for minimum temperature
    let tempMin = document.createElement("p");
    tempMin.innerHTML = `Minimum temperature: ${details.main.temp_min}°`; // Set the inner HTML to minimum temperature

    // Create a paragraph for maximum temperature
    let tempMax = document.createElement("p");
    tempMax.innerHTML = `Maximum temperature: ${details.main.temp_max}°`; // Set the inner HTML to maximum temperature

    // Create a paragraph for humidity
    let humidity = document.createElement("p");
    humidity.innerHTML = `Humidity: ${details.main.humidity}%`; // Set the inner HTML to humidity

    // Create a paragraph for atmospheric pressure
    let pressure = document.createElement("p");
    pressure.innerHTML = `Atmospheric pressure: ${details.main.pressure}`; // Set the inner HTML to atmospheric pressure

    // Create a paragraph for wind speed
    let wind = document.createElement("p");
    wind.innerHTML = `Wind speed: ${details.wind.speed} km/h`; // Set the inner HTML to wind speed

    divDetails.append(sensation, tempMin, tempMax, humidity, pressure, wind); // Append all details to div
    container.appendChild(divDetails); // Append the details div to the main container
}
