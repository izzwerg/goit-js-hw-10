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
const daysField = document.querySelector('button[data-days]');
const hoursField = document.querySelector('button[data-hours]');
const minutesField = document.querySelector('button[data-minutes]');
const secondsField = document.querySelector('button[data-seconds]');

let choosenDate = '';

function startTimer() {
  dateField.classList.add('is-disable');
  dateField.setAttribute('disabled', '');
  startButton.removeEventListener('click', startTimer);
  startButton.classList.remove('is-active');
}

function dateValidate() {
  if (choosenDate.getTime() < Date.now()) {
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
