import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

//
form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = parseInt(form.elements.delay.value);
  const stepInput = parseInt(form.elements.step.value);
  const amountInput = parseInt(form.elements.amount.value);

  const promises = [];

  for (let i = 0; i < amountInput; i += 1) {
    const delay = delayInput + i * stepInput;
    promises.push(createPromise(i + 1, delay));
  }

  promises.forEach(promise => {
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  });
});
