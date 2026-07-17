// ======================================================
// ATTENDANCE MANAGER
// SETTINGS PAGE
// PART 1
// ======================================================


// ======================================================
// GET USER DATA
// ======================================================

let currentUser = loadUser();

let users =
JSON.parse(localStorage.getItem("users")) || [];

if(currentUser == null){

    alert("Please Sign In First.");

    window.location.href = "login.html";

}



// ======================================================
// CREATE DEFAULT SETTINGS
// ======================================================

if(!currentUser.settings){

    currentUser.settings = {

        theme:"light",

        primary:"#3032aa",

        notifications:{

            email:false,

            reminder:true,

            lowAttendance:true

        }

    };

}



// ======================================================
// GET HTML ELEMENTS
// ======================================================


// Profile

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const rollNumber =
document.getElementById("rollNumber");

const mobile =
document.getElementById("mobile");

const saveProfile =
document.getElementById("saveProfile");


// Notification

const emailNotification =
document.getElementById("emailNotification");

const attendanceReminder =
document.getElementById("attendanceReminder");

const lowAttendanceAlert =
document.getElementById("lowAttendanceAlert");



// ======================================================
// LOAD PROFILE
// ======================================================

function loadProfile(){

   fullName.value =
currentUser.name || "";

email.value =
currentUser.email || "";

rollNumber.value =
currentUser.roll || "";

mobile.value =
currentUser.mobile || "";

}



// ======================================================
// LOAD NOTIFICATIONS
// ======================================================

function loadNotifications(){

    emailNotification.checked =
    currentUser.settings.notifications.email;

    attendanceReminder.checked =
    currentUser.settings.notifications.reminder;

    lowAttendanceAlert.checked =
    currentUser.settings.notifications.lowAttendance;

}



// ======================================================
// SAVE USER
// ======================================================

function saveSettingsUser(){

    localStorage.setItem(

        "currentUser",

        JSON.stringify(currentUser)

    );



    const index = users.findIndex(function(user){

        return user.email === currentUser.email;

    });


    if(index != -1){

        users[index] = currentUser;

    }


    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

}



// ======================================================
// SAVE PROFILE
// ======================================================

function saveProfileData(){

    const oldEmail =
    currentUser.email;


    currentUser.name =
    fullName.value.trim();

    currentUser.email =
    email.value.trim();

    currentUser.roll=
    rollNumber.value.trim();

    currentUser.mobile =
    mobile.value.trim();



    const index = users.findIndex(function(user){

        return user.email === oldEmail;

    });


    if(index != -1){

        users[index] = currentUser;

    }


    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );


    localStorage.setItem(

        "currentUser",

        JSON.stringify(currentUser)

    );


    alert("Profile Saved Successfully.");

}



// ======================================================
// SAVE NOTIFICATIONS
// ======================================================

function saveNotifications(){

    currentUser.settings.notifications.email =

    emailNotification.checked;


    currentUser.settings.notifications.reminder =

    attendanceReminder.checked;


    currentUser.settings.notifications.lowAttendance =

    lowAttendanceAlert.checked;


    saveSettingsUser();

}



// ======================================================
// EVENTS
// ======================================================

saveProfile.addEventListener(

    "click",

    saveProfileData

);


emailNotification.addEventListener(

    "change",

    saveNotifications

);


attendanceReminder.addEventListener(

    "change",

    saveNotifications

);


lowAttendanceAlert.addEventListener(

    "change",

    saveNotifications

);



// ======================================================
// INITIAL LOAD
// ======================================================

loadProfile();

loadNotifications();
// ======================================================
// THEME & PRIMARY COLOR
// ======================================================


// Get Theme Cards

const themeCards =
document.querySelectorAll(".theme-card");


// Get Color Cards

const colorCards =
document.querySelectorAll(".color");



// ======================================================
// LOAD THEME
// ======================================================

function loadTheme(){

    themeCards.forEach(function(card){

        card.classList.remove("active");

        if(

            card.dataset.theme ===

            currentUser.settings.theme

        ){

            card.classList.add("active");

        }

    });

}



// ======================================================
// LOAD PRIMARY COLOR
// ======================================================

function loadPrimaryColor(){

    colorCards.forEach(function(card){

        card.classList.remove("active");

        if(

            card.dataset.color ===

            currentUser.settings.primary

        ){

            card.classList.add("active");

        }

    });

}



// ======================================================
// SAVE THEME
// ======================================================

function saveTheme(theme){

    currentUser.settings.theme = theme;

    saveSettingsUser();

}



// ======================================================
// SAVE PRIMARY COLOR
// ======================================================

function savePrimaryColor(color){

    currentUser.settings.primary = color;

    saveSettingsUser();

}



// ======================================================
// THEME CLICK
// ======================================================

themeCards.forEach(function(card){

    card.addEventListener(

        "click",

        function(){

            themeCards.forEach(function(item){

                item.classList.remove("active");

            });


            this.classList.add("active");


            saveTheme(

                this.dataset.theme

            );


            // This function will be inside theme.js

            if(typeof applyTheme === "function"){

                applyTheme();

            }

        }

    );

});



// ======================================================
// PRIMARY COLOR CLICK
// ======================================================

colorCards.forEach(function(card){

    card.addEventListener(

        "click",

        function(){

            colorCards.forEach(function(item){

                item.classList.remove("active");

            });


            this.classList.add("active");


            savePrimaryColor(

                this.dataset.color

            );


            // This function will be inside theme.js

            if(typeof applyTheme === "function"){

                applyTheme();

            }

        }

    );

});



// ======================================================
// LOAD SAVED SETTINGS
// ======================================================

loadTheme();

loadPrimaryColor();
// ======================================================
// ACCOUNT BUTTONS
// ======================================================

const changePasswordButton =
document.getElementById("changePassword");

const exportDataButton =
document.getElementById("exportData");

const clearAttendanceButton =
document.getElementById("clearAttendance");



// ======================================================
// CHANGE PASSWORD
// ======================================================

function changePassword(){

    const currentPassword = prompt(

        "Enter Current Password"

    );

    if(currentPassword === null){

        return;

    }

    if(currentPassword !== currentUser.password){

        alert("Wrong Password!");

        return;

    }

    const newPassword = prompt(

        "Enter New Password"

    );

    if(newPassword === null){

        return;

    }

    if(newPassword.trim() === ""){

        alert("Password cannot be empty.");

        return;

    }

    const confirmPassword = prompt(

        "Confirm New Password"

    );

    if(confirmPassword === null){

        return;

    }

    if(newPassword !== confirmPassword){

        alert("Passwords do not match.");

        return;

    }

    currentUser.password = newPassword;

    saveSettingsUser();

    alert("Password Changed Successfully.");

}



// ======================================================
// EXPORT DATA
// ======================================================

function exportData(){

    const data = {

        profile: currentUser,

        users:
        JSON.parse(localStorage.getItem("users")) || [],

        timetable:
        JSON.parse(localStorage.getItem("timetable")) || {},

        attendance:
        JSON.parse(localStorage.getItem("attendance")) || {},

        reminders:
        JSON.parse(localStorage.getItem("reminders")) || [],

        reminderSettings:
        JSON.parse(localStorage.getItem("reminderSettings")) || {},

        subjects:
        JSON.parse(localStorage.getItem("subjects")) || []

    };



    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                4

            )

        ],

        {

            type:"application/json"

        }

    );



    const url =

    URL.createObjectURL(blob);



    const a =

    document.createElement("a");



    a.href = url;

    a.download =

    "AttendanceManagerData.json";



    a.click();



    URL.revokeObjectURL(url);

}



// ======================================================
// CLEAR ATTENDANCE
// ======================================================

function clearAttendance(){

    const answer = confirm(
        "Are you sure you want to delete all attendance data?"
    );


    if(!answer){

        return;

    }


    currentUser.attendance = {};

    saveSettingsUser();


    alert(
        "Attendance Data Cleared Successfully."
    );

}


// ======================================================
// EVENTS
// ======================================================

changePasswordButton.addEventListener(

    "click",

    changePassword

);



exportDataButton.addEventListener(

    "click",

    exportData

);



clearAttendanceButton.addEventListener(

    "click",

    clearAttendance

);
// ======================================================
// LOGOUT
// ======================================================

const logoutButton =
document.querySelector(".logout-btn");


logoutButton.addEventListener("click",function(){

    let confirmLogout = confirm(
        "Are you sure you want to logout?"
    );


    if(confirmLogout){

        localStorage.removeItem("currentUser");

        window.location.href="login.html";

    }

});