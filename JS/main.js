/* This function runs the analog clock. */

setInterval(
    function() {
        date = new Date();
        sec = date.getSeconds() * 6;
        min = date.getMinutes() * 6;
        hor = date.getHours() * 30 + Math.round(min /12);
        document.getElementById("second-hand").style.transform = "rotate(" + sec + "deg)"
        document.getElementById("minute-hand").style.transform = "rotate(" + min + "deg)"
        document.getElementById("hour-hand").style.transform = "rotate(" + hor + "deg)";
    }
)

/* This will power the digital clock */

setInterval(function () {
    const time = new Date();
    const second = time.getSeconds();
    const minute = time.getMinutes();
    const hour = time.getHours();
    document.querySelector(".display").textContent = hour + ":" + minute + ":" + second;
}, 1000);

/* This will push times into the alarm array and display them */

let setAlarms = [];

function addAlarm() {
    const hh = document.querySelector("select[name='hourInput']").value;
    const mm = document.querySelector("select[name='minuteInput']").value;
    const ampm = document.querySelector("select[name='ampm']").value;
    
    let alarm = hh + ":" + mm + " " + ampm;
    setAlarms.push(alarm);
    displayAlarms();
}

function displayAlarms() {
    const alarmsContainer = document.querySelector(".alarms");
    alarmsContainer.innerHTML = ""; // Clear previous content
    
    // Loop through the array and display each alarm
    setAlarms.forEach(function(alarm, index) {
        const alarmElement = document.createElement("div");
        alarmElement.textContent = "Alarm " + (index + 1) + ": " + alarm;
        alarmsContainer.appendChild(alarmElement);
    });
}

// Attach event listener to the "Add Alarm" button
document.getElementById("set").addEventListener("click", addAlarm);
