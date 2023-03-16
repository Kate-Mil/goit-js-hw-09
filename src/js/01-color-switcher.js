const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

refs.startBtn.addEventListener('click', onClickChangeColor);
refs.stopBtn.addEventListener('click', onclickStopChangingColor);
let timerId = null;
refs.stopBtn.setAttribute('disabled', 'true');

function onClickChangeColor(e) {
    timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor()},1000);
    refs.startBtn.setAttribute('disabled', 'true');
    refs.stopBtn.removeAttribute("disabled");
}


function onclickStopChangingColor(e){
    clearInterval(timerId);
    refs.stopBtn.setAttribute('disabled', 'true');
    refs.startBtn.removeAttribute("disabled");
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
