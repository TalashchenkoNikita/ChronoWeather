// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const result = document.querySelector('.result');
const body = document.querySelector('body');
const inputFp = document.querySelector('#datetime-picker');

const fp = flatpickr(inputFp, {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  allowInput: true,
  disableMobile: true, // ← вимикає нативний мобільний пікер

  onReady(_, __, instance) {
    instance.altInput.type = 'text'; // ← примусово перезаписуємо type
    instance.altInput.placeholder = 'Select a date';
  },
});

export function createResultCard(
  { tmin, tmax, wspd },
  date,
  request,
  countryCode
) {
  changeBackground(date);
  const markup = `<p class="city-title">
        City: ${capitalize(request)} 
        <img 
            src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" 
            alt="flag ${countryCode}" 
            width="24" 
            height="16"
        >
    </p>
    <p class="date">Date: ${date}</p>
    <p class="max-temp">Max temperature: ${tmax} °C</p>
    <p class="msn-temp">Minimal temperature: ${tmin} °C</p>
    <p class="windspeed">Average windspeed: ${wspd} m/s</p>`;
  result.style.visibility = 'visible';
  result.insertAdjacentHTML('beforeend', markup);
}

export function clearResult() {
  result.style.visibility = 'hidden';
  result.innerHTML = '';
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
}

function changeBackground(date) {
  const month = Number(date.split('-')[1]);
  switch (month) {
    case 12:
    case 1:
    case 2:
      return (body.className = 'winter');

    case 3:
    case 4:
    case 5:
      return (body.className = 'spring');

    case 6:
    case 7:
    case 8:
      return (body.className = 'summer');

    case 9:
    case 10:
    case 11:
      return (body.className = 'autumn');

    default:
      return 'Некорректный месяц';
  }
}
