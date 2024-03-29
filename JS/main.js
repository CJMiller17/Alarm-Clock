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
    document.querySelector(".display").textContent = `${hour}:${minute}:${second}`;
}, 1000);

/* This will push times into the alarm array and display them */

let setAlarms = [];

function addAlarm() {
    if (setAlarms.length < 5) {
        const hh = document.querySelector("select[name='hourInput']").value;
        const mm = document.querySelector("select[name='minuteInput']").value;
        const ampm = document.querySelector("select[name='ampm']").value;
        
        let alarm = `${hh}:${mm} ${ampm}`;
        setAlarms.push(alarm);
        setAlarmTime();
        displayAlarms();
    } else {
        alert("You can only set up to 5 alarms");
    }
}

let isAlarmPlaying = false;
let alarmTime = null;

function sound(isChecked) {
    const currentTime = new Date();

    if (alarmTime && currentTime.getHours() === alarmTime.getHours() && currentTime.getMinutes() === alarmTime.getMinutes()) {
        if (document.querySelector("input[type='checkbox']").checked) {
            if (!isAlarmPlaying) {
                const goingOff = new Audio("alarm.mp3");
                goingOff.loop = true;
                goingOff.play();
                console.log("Before alert");
                alert("Wake Up Beautiful");
                console.log("After Alert");
                isAlarmPlaying = true;
            }
        }
    } else {
        isAlarmPlaying = false;
        alarmTime = null;
    }

}

function setAlarmTime() {
    const hh = document.querySelector("select[name='hourInput']").value;
    const mm = document.querySelector("select[name='minuteInput']").value;
    const ampm = document.querySelector("select[name='ampm']").value;

    alarmTime = new Date();
    alarmTime.setHours(hh);
    alarmTime.setMinutes(mm);
    alarmTime.setSeconds(0);
    sound(true);
}

function displayAlarms() {
    const activeAlarm = document.querySelector(".alarms");
    activeAlarm.innerHTML = ""; //prevent exponential adding of divs
    
    // Loop through the array and display each alarm
    for (let i = 0; i < setAlarms.length; i++) {
        const alarmElement = document.createElement("div");
        alarmElement.textContent = setAlarms[i];
        activeAlarm.appendChild(alarmElement);

        const toggleLabel = document.createElement("label");
        toggleLabel.classList.add("switch");
        
        const toggleInput = document.createElement("input");
        toggleInput.type = "checkbox";
        toggleInput.checked = true; //default state
                
        const toggleSpan = document.createElement("span");
        toggleSpan.classList.add("slider", "round");
        
        toggleLabel.appendChild(toggleInput);
        toggleLabel.appendChild(toggleSpan);
        // toggleInput.addEventListener("change", function () {
        //     sound(toggleInput.checked);
        // });
        alarmElement.appendChild(toggleLabel);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete"
        deleteBtn.addEventListener("click", function () {
            deleteAlarm(i);
        });
        alarmElement.appendChild(deleteBtn);
    };
}

function deleteAlarm(index) {
    setAlarms.splice(index, 1);
    displayAlarms();
}
// Attach event listener to the "Add Alarm" button
document.getElementById("set").addEventListener("click", addAlarm); //put this closer to the button itself
setInterval(sound, 1000);