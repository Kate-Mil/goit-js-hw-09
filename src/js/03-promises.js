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
   createPromise(position, delay)
   .then(({position,delay}) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false});
   })
   .catch((position,delay) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false});
   });
   delay += step;
}
refs.form.reset();
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
  if (shouldResolve) {
    resolve({position,delay});
  } else {
    reject({position,delay});
  }
  }, delay);
});  
}
