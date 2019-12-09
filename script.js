let countdownItem = document.getElementById("countdown");
let windowItem = document.getElementById("window");
let bgItem = document.getElementById("background");

const isOpenClass = "is-open";

let startDate = new Date("Aug 13, 2019 00:00:00").getTime();
let endDate = new Date("Aug 13, 2021 00:00:00").getTime();

let x = setInterval(countTime, 1000);

let countPoints = 30;
let fullDistance = endDate - startDate;
let distancePerPoint = fullDistance / countPoints;

function countTime() {
    
    let now = new Date().getTime();
    
    let distance = endDate - now;
    
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownItem.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        countdownItem.innerHTML = "0d 0h 0m 0s";
        windowItem.classList.add(isOpenClass);
    }
}

countTime();