import * as finder from "./js/find-city.js";
import * as weather from "./js/weather.js";
import * as render from "./js/render.js";
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  render.clearResult();
  const data = new FormData(form);
  const request = data.get("search-text").trim();
  const date = data.get("datetime-picker").split(" ")[0];
  let firstStationId = null;
  if (!request && date) return;

  try {
    const cities = await finder.getGeoByCity(request);
    let countryCode = "UA";
    if (Array.isArray(cities) && cities.length > 0) {
      const { latitude, longitude, country } = cities[0];
      const stations = await weather.getCityByCoordinates(latitude, longitude);
      countryCode = country;
      if (stations && stations.data && stations.data.length > 0) {
        firstStationId = weather.getIdFromFirstStation(stations);
      } else {
        iziToast.show({
          message: "Station not found",
          color: "red",
          position: "topRight",
        });
        return;
      }
      const dayInfo = await weather.getDayInfo(firstStationId, date);
      if (dayInfo.data.length !== 0) {
        render.createResultCard(dayInfo.data[0], date, request, countryCode);
      } else {
        iziToast.show({
          message: "No data for this date, try another one",
          color: "red",
          position: "topRight",
        });
        return;
      }
      
    } else {
      iziToast.show({
          message: "City not found",
          color: "red",
          position: "topRight",
        });
      return;
    }
  } catch (err) {
    console.error("Ошибка:", err);
  } finally {
    form.reset();
  }
});
