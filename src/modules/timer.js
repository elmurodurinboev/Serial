function timer(){
  const deadline = "2024-08-11";

  function getTimeRemaining(endTime) {
    const timer = Date.parse(endTime) - Date.parse(new Date());
    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / (1000 * 60)) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getThero(time) {
    if (time >= 0 && time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(uppdateClock, 1000);
    uppdateClock();

    function uppdateClock() {
      const t = getTimeRemaining(endTime);
      days.innerHTML = getThero(t.days);
      hours.innerHTML = getThero(t.hours);
      minutes.innerHTML = getThero(t.minutes);
      seconds.innerHTML = getThero(t.seconds);

      if (timer < 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setInterval(setClock(".timer", deadline), 1000);
}

module.exports = timer;