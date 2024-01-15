import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const timeInput = document.querySelector('input[name="delay"]');
const selectButtons = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', submitForm);

let delay = 0;

function errorMessage() {
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    iconUrl: 'error.svg',
    iconColor: 'white',
    color: '#EF4040',
    message: `Rejected promise in ${delay}ms`,
  });
}

function successMessage() {
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    iconUrl: 'success.svg',
    iconColor: 'white',
    color: '#59A10D',
    message: `Fulfilled promise in ${delay}ms`,
  });
}

function submitForm(event) {
  event.preventDefault();
  delay = Number(timeInput.value);

  let choosenRadio;
  selectButtons.forEach(selBtn => {
    if (selBtn.checked) {
      choosenRadio = selBtn.value;
    }
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (choosenRadio === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      successMessage(delay);
    })
    .catch(delay => {
      errorMessage(delay);
    });
  form.reset();
}
