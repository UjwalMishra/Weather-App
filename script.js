const cityField = document.querySelector("[data-cityName]");
const weatherDescField = document.querySelector("[data-weatherDesc]");
const weatherIconField = document.querySelector("[data-weatherIcon]");
const temperatureField = document.querySelector("[data-temp]");

const form = document.querySelector("[data-searchForm]");
// const inputValue = document.querySelector(".inputvalue");
// const searchBtn = document.querySelector(".searchbtn");
const searchField = document.querySelector("[search-btn]");

const datawindspeed = document.querySelector("[data-windspeed]");
const datacloud = document.querySelector("[data-cloud]");
const datahumidity = document.querySelector("[data-humidity]");
// city name
let target = "amritsar";

//fetching API
const fetchApi = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=07350ac0f54941db81d165434241302&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const {
      current: {
        cloud,
        temp_c,
        wind_kph,
        humidity,
        condition: { icon, text },
      },
      location: { name, region, localtime },
    } = data;

    updateData(temp_c, cloud, wind_kph, humidity, icon, text, name);
  } catch (error) {
    alert("Location not found");
  }
};

// updation of data
function updateData(temp_c, cloud, wind_kph, humidity, icon, text, cityName) {
  temperatureField.innerText = temp_c + "° C";
  datacloud.innerText = cloud;
  datawindspeed.innerText = wind_kph + " Km/h";
  datahumidity.innerText = humidity + " %";
  weatherDescField.innerText = text;
  weatherIconField.src = icon;
  cityField.innerText = cityName;
}
fetchApi(target);

// to access input form
form.addEventListener("submit", (e) => {
  // to stop reload
  e.preventDefault();

  target = searchField.value;
  fetchApi(target);
});
