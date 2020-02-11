let countdownItem = document.getElementById("countdown");
let countdownContainerItem = document.getElementById("countdown-container");
let totalItem = document.getElementById("total");
let windowItem = document.getElementById("window");

const isOpenClass = "is-open";
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1uaD3WagQYZu2Ho0GE9Sh0-gl5ZVFG0LabC4RZh1olQQ/edit?usp=sharing';

let startDate;
let endDate;

let totalYears;
let totalMonths;
let totalDays;

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
    totalItem.innerHTML = `${leftYears}y ${leftMonths}m ${leftDays}d / ${totalYears > 0 ? totalYears + "y " : ""}${totalMonths > 0 ? totalMonths + "m " : ""}${totalDays > 0 ? totalDays + "d " : ""}`;

    if (endDate.diff(now, 'seconds') < 0) {
        clearInterval(interval);
        countdownItem.innerHTML = "0d 0h 0m 0s";
        totalItem.innerHTML = "0y 0m 0d / 2y";
        windowItem.classList.add(isOpenClass);
    }
}

function initTableTop() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: onGetDataFromSpreadsheet
    })
}

function onGetDataFromSpreadsheet(data) {
    let prisonData = data.prison.all();

    if (prisonData && prisonData.length > 0) {
        let firstPrisonData = prisonData[0];

        startDate = moment(firstPrisonData.start);
        endDate = moment(firstPrisonData.end);

        let date = endDate.clone();

        totalYears = date.diff(startDate, 'years');
        date = date.subtract(totalYears, 'years');

        totalMonths = date.diff(startDate, 'months');
        date = date.subtract(totalMonths, 'months');

        totalDays = date.diff(startDate, 'days');

        countdownContainerItem.classList.remove("hidden");

        updateTime();
    }
}

window.addEventListener('DOMContentLoaded', initTableTop)