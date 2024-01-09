// 'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let countdown;
let userSelectedDate;

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

startButton.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timer(seconds) {
  clearInterval(countdown);

  const then = Date.now() + seconds * 1000;

  countdown = setInterval(() => {
    const msLeft = then - Date.now();
    if (msLeft < 0) {
      clearInterval(countdown);
      return;
    }

    const timeLeft = convertMs(msLeft);
    displayTimeLeft(timeLeft);
  }, 1000);
}

function displayTimeLeft(timeLeft) {
  const { days, hours, minutes, seconds } = timeLeft;
  const display = `${addLeadingZero(days)}:${addLeadingZero(
    hours
  )}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function startTimer() {
  const seconds = (userSelectedDate.getTime() - Date.now()) / 1000;
  timer(seconds);
  startButton.disabled = true;
}

startButton.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      iziToast.warning({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        progressBarColor: '#FFBEBE',
        color: '#FFFFFF',
        colorIcon: '#FFFFFF',
        icon: 'my-icon',
        close: true,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);