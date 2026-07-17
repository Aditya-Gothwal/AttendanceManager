// ================= REMINDERS =================

let currentUser = loadUser();

let reminders = currentUser.reminders || [];



// ================= LOAD DATA =================

let timetable = currentUser.timetable || {};

let attendance = currentUser.attendance || {};



// ================= TODAY =================

const weekDays = [

    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"

];

const today = new Date();

const currentDay =
weekDays[today.getDay()];




// ================= SETTINGS =================

let settings =

JSON.parse(
localStorage.getItem("reminderSettings")
)

||

{

    dailyReminder:true,

    attendanceAlert:true,

    emailNotification:false,

    target:75

};




// ================= LOAD SETTINGS =================

document.getElementById("dailyReminder").checked =
settings.dailyReminder;

document.getElementById("attendanceAlert").checked =
settings.attendanceAlert;

document.getElementById("emailNotification").checked =
settings.emailNotification;

document.getElementById("attendanceTarget").value =
settings.target;




// ================= SAVE SETTINGS =================

function saveSettings(){


    settings.dailyReminder =
    document.getElementById("dailyReminder").checked;


    settings.attendanceAlert =
    document.getElementById("attendanceAlert").checked;


    settings.emailNotification =
    document.getElementById("emailNotification").checked;


    settings.target =
    Number(
        document.getElementById("attendanceTarget").value
    );


    currentUser.reminders = reminders;
updateCurrentUser(currentUser);


}



document
.getElementById("dailyReminder")
.onchange = saveSettings;


document
.getElementById("attendanceAlert")
.onchange = saveSettings;


document
.getElementById("emailNotification")
.onchange = saveSettings;


document
.getElementById("attendanceTarget")
.onchange = function(){

    saveSettings();

    showWarnings();

};




// ================= TODAY CLASSES =================

function showTodayClasses(){

    let container =
    document.getElementById("todayClasses");


    container.innerHTML = "";


    let classes =
    timetable[currentDay] || [];


    if(classes.length===0){

        container.innerHTML =

        `

        <div class="class-item">

            No Classes Today

        </div>

        `;

        return;

    }



    classes.forEach(cls=>{


        container.innerHTML +=

        `

        <div class="class-item">

            <div>

                <div class="class-subject">

                    ${cls.subject}

                </div>

                <div class="class-info">

                    ${cls.room} • ${cls.professor}

                </div>

            </div>

            <div class="class-time">

                ${cls.time}

            </div>

        </div>

        `;


    });


}




// ================= WARNING SUBJECTS =================

function showWarnings(){

    let warning =
    document.getElementById("warningList");


    warning.innerHTML = "";


    let subjects = {};



    Object.values(attendance).forEach(day=>{


        day.classes.forEach(cls=>{


            if(!subjects[cls.subject]){


                subjects[cls.subject] = {

                    total:0,

                    present:0

                };


            }


            subjects[cls.subject].total++;


            if(cls.status==="Present"){

                subjects[cls.subject].present++;

            }


        });


    });




    let found = false;




    Object.keys(subjects).forEach(subject=>{


        let data =
        subjects[subject];


        let percentage =

        Math.round(

            (data.present/data.total)*100

        );



        if(percentage < settings.target){


            found = true;


            let need = 0;

            let p = data.present;

            let t = data.total;



            while(

                Math.round((p/t)*100)

                < settings.target

            ){

                p++;

                t++;

                need++;

            }



            warning.innerHTML +=

            `

            <div class="warning-item">

                <div class="warning-icon">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                </div>

                <div class="warning-subject">

                    ${subject}

                </div>

                <div class="warning-percent">

                    ${percentage}%

                </div>

                <div class="warning-text">

                    Need ${need} more present class(es)
                    to reach ${settings.target}%.

                </div>

                <button>

                    View Subject

                </button>

            </div>

            `;

        }


    });




    if(!found){


        warning.innerHTML =

        `

        <div class="warning-item">

            <div class="warning-subject">

                🎉 Great!

            </div>

            <div class="warning-text">

                All your subjects are above
                your attendance target.

            </div>

        </div>

        `;

    }

}
    // ================= ADD REMINDER =================

document
.querySelector(".add-btn")
.addEventListener("click", addReminder);



function addReminder(){

    let title = prompt(
        "Reminder Title\n\nExample:\nPhysics Quiz"
    );

    if(title===null || title.trim()==="")
    return;



    let date = prompt(
        "Reminder Date\n\nFormat : YYYY-MM-DD"
    );

    if(date===null || date.trim()==="")
    return;



    let time = prompt(
        "Reminder Time\n\nFormat : HH:MM\nExample : 09:30"
    );

    if(time===null || time.trim()==="")
    return;



    reminders.push({

        title:title,

        date:date,

        time:time,

        notified:false

    });



    currentUser.reminders = reminders;
updateCurrentUser(currentUser);
    displayReminders();

    alert("Reminder Added Successfully!");

}



// ================= NOTIFICATION PERMISSION =================

if("Notification" in window){

    Notification.requestPermission();

}


// ================= DISPLAY REMINDERS =================

function displayReminders() {

    const container = document.getElementById("reminderList");

    container.innerHTML = "";

    if (reminders.length === 0) {

        container.innerHTML = `

        <div class="class-item">

            No reminders added.

        </div>

        `;

        return;
    }

    reminders.sort(function (a, b) {

        return new Date(a.date + "T" + a.time) -
               new Date(b.date + "T" + b.time);

    });

    reminders.forEach(function (reminder, index) {

        container.innerHTML += `

        <div class="reminder-item">

            <div class="reminder-left">

                <div class="reminder-title">
                    ${reminder.title}
                </div>

                <div class="reminder-date">
                    ${reminder.date}
                </div>

            </div>

            <div class="reminder-right">

                <div class="reminder-time">
                    ${reminder.time}
                </div>

                <button
                    class="edit-btn"
                    data-index="${index}">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="delete-btn"
                    data-index="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    attachReminderButtons();

}



// ================= BUTTONS =================

function attachReminderButtons() {

    document
    .querySelectorAll(".edit-btn")
    .forEach(function (button) {

        button.onclick = function () {

            editReminder(
                Number(this.dataset.index)
            );

        };

    });



    document
    .querySelectorAll(".delete-btn")
    .forEach(function (button) {

        button.onclick = function () {

            deleteReminder(
                Number(this.dataset.index)
            );

        };

    });

}



// ================= EDIT =================

function editReminder(index) {

    let reminder = reminders[index];

    let title = prompt(
        "Reminder Title",
        reminder.title
    );

    if (title === null) return;

    let date = prompt(
        "Reminder Date",
        reminder.date
    );

    if (date === null) return;

    let time = prompt(
        "Reminder Time",
        reminder.time
    );

    if (time === null) return;

    reminders[index] = {

    ...reminder,

    title: title,
    date: date,
    time: time,

    notified: false

};

    currentUser.reminders = reminders;
updateCurrentUser(currentUser);

    displayReminders();

}



// ================= DELETE =================

function deleteReminder(index) {

    if (!confirm("Delete this reminder?"))
        return;

    reminders.splice(index, 1);

    currentUser.reminders = reminders;
updateCurrentUser(currentUser);

    displayReminders();

}
// ================= CHECK REMINDERS =================

function checkReminders(){

    if(Notification.permission!=="granted")
    return;



    let now = new Date();



    reminders.forEach(reminder=>{


        if(reminder.notified)
        return;



        let reminderTime = new Date(

            reminder.date +
            "T" +
            reminder.time

        );



        let difference =

        reminderTime - now;



        if(

            difference <= 3600000 &&
            difference > 0

        ){


            new Notification(

                "Attendance Manager",

                {

                    body:
                    reminder.title +
                    "\nStarts in 1 hour."

                }

            );



            reminder.notified = true;



           currentUser.reminders = reminders;
updateCurrentUser(currentUser);

        }


    });

}



// ================= CHECK EVERY MINUTE =================

setInterval(function(){

    checkReminders();

    removeExpiredReminders();

    displayReminders();

},60000);



// ================= START APP =================

window.addEventListener("load", function(){

    removeExpiredReminders();

    showTodayClasses();

    showWarnings();

    displayReminders();

    checkReminders();

});
document.querySelector(".view-btn").onclick = function () {

    window.location.href = "timetable.html";

};
function removeExpiredReminders() {

    let now = new Date();

    reminders = reminders.filter(function(reminder){

        return new Date(
            reminder.date + "T" + reminder.time
        ) > now;

    });

   currentUser.reminders = reminders;
updateCurrentUser(currentUser);

}