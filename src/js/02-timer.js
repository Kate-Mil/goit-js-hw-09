import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date,
    minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < Date.now()){
    Notify.failure('Please choose a date in the future');
    selectedDates[0]= new Date;
    } else {
        refs.startBtn.removeAttribute('disabled');
        selectedTime = selectedDates[0];
     }
    },
  };

  const refs = {
    startBtn: document.querySelector('button[data-start]'),
    input: document.querySelector('input#datetime-picker'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  };


  
  class Timer {
    constructor (){
    this.timerId = null;
    this.isActive = false;
    refs.startBtn.setAttribute('disabled', 'true');
    }
 

  start(){
    if(this.isActive){
      return;
    } 
    this.isActive = true;
    this.timerId = setInterval(()=>{
    const currentTime = Date.now();
    const deltaTime = selectedTime.getTime() - currentTime;
    const covertTime = convertMs(deltaTime);
    this.updateTimerInterface(covertTime);

    if (deltaTime <= 0){
      this.stop();
      this.isActive = false;
      this.updateTimerInterface({ days:'00', hours:'00', minutes:'00', seconds:'00' });
    }
     }, 1000);
    
    };

    updateTimerInterface({ days, hours, minutes, seconds }){
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }

  stop(){
    clearInterval(this.timerId);
  }
  }


  const timer = new Timer();
  flatpickr(refs.input, options);

  refs.startBtn.addEventListener('click', () => {
    timer.start();
    refs.startBtn.setAttribute('disabled', 'true');
  }) 



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }