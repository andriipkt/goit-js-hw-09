import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};
//

flatpickr(datetimePicker, options);

// functions
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//

//
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//

//
function interfaceChangeTime(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysElem.textContent = days >= 100 ? days : addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}
//

//
function startTimer(targetDate) {
  const countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      interfaceChangeTime(0);
    } else {
      interfaceChangeTime(timeDifference);
    }
  }, 1000);

  datetimePicker.disabled = true;
  startButton.disabled = true;
}
//

//button
startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value);

  if (selectedDate) {
    startTimer(selectedDate);
  }
});

datetimePicker.disabled = false;
startButton.disabled = false;
