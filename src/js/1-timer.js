import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

const dateField = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let choosenDate = '';

function normalizeTime(v) {
  return String(v).padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) {
  daysField.textContent = normalizeTime(days);
  hoursField.textContent = normalizeTime(hours);
  minutesField.textContent = normalizeTime(minutes);
  secondsField.textContent = normalizeTime(seconds);
}

function errMessage() {
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    iconUrl: 'error.svg',
    iconColor: 'white',
    color: '#EF4040',
    message: 'Please choose a date in the future',
  });
  startButton.removeEventListener('click', startTimer);
  startButton.classList.remove('is-active');
}

function startTimer() {
  if (choosenDate.getTime() < Date.now()) {
    errMessage();
    return;
  }
  dateField.classList.add('is-disable');
  dateField.setAttribute('disabled', '');
  startButton.removeEventListener('click', startTimer);
  startButton.classList.remove('is-active');
  let intervalID = setInterval(() => {
    const currentTime = Date.now();
    const timeLeft = choosenDate.getTime() - currentTime;
    const time = convertMs(timeLeft);
    updateClock(time);

    if (
      time.days < 1 &&
      time.hours < 1 &&
      time.minutes < 1 &&
      time.seconds < 1
    ) {
      clearInterval(intervalID);
      dateField.removeAttribute('disabled');
      dateField.classList.remove('is-disable');
    }
  }, 1000);
}

function dateValidate() {
  if (choosenDate.getTime() < Date.now()) {
    errMessage();
  } else {
    startButton.addEventListener('click', startTimer);
    startButton.classList.add('is-active');
  }
}

flatpickr(dateField, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenDate = selectedDates[0];
    dateValidate();
  },
});
