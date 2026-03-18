import axios from "axios";

export async function getGeoByCity(cityName) {
  const options = {
    method: "GET",
    url: "https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding",
    params: { city: cityName },
    headers: {
      "x-rapidapi-key": "86d5406d44mshecff8b83aef3ec5p1c73d7jsna35665601b9f",
      "x-rapidapi-host": "geocoding-by-api-ninjas.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.request(options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
