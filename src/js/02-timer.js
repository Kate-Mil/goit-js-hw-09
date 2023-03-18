import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date,
    minuteIncrement: 1,
    onClose(selectedDates) {
    // if (selectedDates[0] < Date.now()){
    // window.alert('Please choose a date in the future')
    // } else {
    // document.querySelector('button').removeAttribute('disabled');
            console.log(selectedDates[0]);
            console.log(defaultDate.getTime());
    //  }
    },
  };

  document.querySelector('button').setAttribute('disabled', 'true');

  flatpickr(document.querySelector('input#datetime-picker'), options)








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