const secsHand = document.querySelector(".second-hand");
const minsHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

const setTime = () => {
  const date = new Date();

  const sec = date.getSeconds();
  const secDeg = (sec / 60) * 360 + 90;
  secsHand.style.transform = `rotate(${secDeg}deg)`;

  const min = date.getMinutes();
  const minDeg = (min / 60) * 360 + 90;
  minsHand.style.transform = `rotate(${minDeg}deg)`;

  const hrs = date.getHours();
  const hrsDeg = (hrs / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hrsDeg}deg)`;
};

setInterval(setTime, 1000);
setTime();
