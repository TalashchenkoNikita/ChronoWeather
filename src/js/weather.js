import axios from "axios";

export async function getCityByCoordinates(lat, lon) {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://meteostat.p.rapidapi.com/stations/nearby?lat=${lat}&lon=${lon}&limit=5`,
      headers: {
        "X-RapidAPI-Key": "86d5406d44mshecff8b83aef3ec5p1c73d7jsna35665601b9f",
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return null;
  }
}

export function getIdFromFirstStation(value) {
  return value.data[0].id;
}

export async function getDayInfo(id, date) {
  try {
    const options = {
      method: "GET",
      url: "https://meteostat.p.rapidapi.com/stations/daily",
      params: {
        station: id,
        start: String(date),
        end:  String(date)
      },
      headers: {
        "x-rapidapi-key": "86d5406d44mshecff8b83aef3ec5p1c73d7jsna35665601b9f",
        "x-rapidapi-host": "meteostat.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
