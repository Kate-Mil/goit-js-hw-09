import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form : document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit (e) {
  e.preventDefault();

  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value); 
 
for (let position = 1; position <= amount; position +=1){
   console.log(position);
   console.log('delay->',delay);
   createPromise(position, delay)
   .then(({position,delay}) => {
    setTimeout(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false});
    }, delay);
   })
   .catch((position,delay) => {
    setTimeout (() => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false});
    }, delay);
   });
   delay += step;
}
refs.form.reset();
}



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
  if (shouldResolve) {
    resolve(objectPromise);
  } else {
    reject(objectPromise);
  }
});  
}
