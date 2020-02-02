let countdownItem = document.getElementById("countdown");
let totalItem = document.getElementById("total");
let windowItem = document.getElementById("window");

const isOpenClass = "is-open";

let startDate = moment("2019-08-13 00:00:00");
let endDate = moment("2021-08-13 00:00:00");

let interval = setInterval(updateTime, 1000);

function updateTime() {
    let now = moment();

    let date = endDate.clone();

    let days = date.diff(now, 'days');

    let leftYears = date.diff(now, 'years');
    date = date.subtract(leftYears, 'years');

    let leftMonths = date.diff(now, 'months');
    date = date.subtract(leftMonths, 'months');

    let leftDays = date.diff(now, 'days');
    date = date.subtract(leftDays, 'days');

    let hours = date.diff(now, 'hours');
    date = date.subtract(hours, 'hours');

    let minutes = date.diff(now, 'minutes');
    date = date.subtract(minutes, 'minutes');

    let seconds = date.diff(now, 'seconds');

    countdownItem.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    totalItem.innerHTML = leftYears + "y " + leftMonths + "m  " + leftDays + "d / 2y";

    if (endDate.diff(now, 'seconds') < 0) {
        clearInterval(interval);
        countdownItem.innerHTML = "0d 0h 0m 0s";
        totalItem.innerHTML = "0y 0m 0d / 2y";
        windowItem.classList.add(isOpenClass);
    }
}

updateTime();