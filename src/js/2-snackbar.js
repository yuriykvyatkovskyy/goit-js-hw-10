'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'Ok',
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        theme: 'dark',
        icon: 'fa fa-check-circle',
      });
    })
    .catch(value => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${value}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        theme: 'dark',
      });
    });
  event.target.elements.delay.value = '';
});