// ======================================================
// ATTENDANCE MANAGER
// STORAGE.JS
// ======================================================



// ======================================================
// GET ALL USERS
// ======================================================

function getUsers(){

    return JSON.parse(

        localStorage.getItem("users")

    ) || [];

}



// ======================================================
// SAVE ALL USERS
// ======================================================

function saveUsers(users){

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

}



// ======================================================
// GET CURRENT USER
// ======================================================

function getCurrentUser(){

    return JSON.parse(

        localStorage.getItem("currentUser")

    );

}



// ======================================================
// SAVE CURRENT USER
// ======================================================

function saveCurrentUser(user){

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

}



// ======================================================
// UPDATE CURRENT USER
// ======================================================

function updateCurrentUser(user){

    saveCurrentUser(user);

    let users = getUsers();

    const index = users.findIndex(function(item){

        return item.email === user.email;

    });

    if(index !== -1){

        users[index] = user;

    }

    saveUsers(users);

}



// ======================================================
// LOGOUT
// ======================================================

function logoutUser(){

    localStorage.removeItem(

        "currentUser"

    );

    window.location.href = "login.html";

}



// ======================================================
// CHECK LOGIN
// ======================================================

function checkLogin(){

    const user = getCurrentUser();

    if(!user){

        alert(

            "Please Sign In First."

        );

        window.location.href =

        "login.html";

        return null;

    }

    return user;

}



// ======================================================
// CREATE DEFAULT USER DATA
// ======================================================

function createDefaultUser(user){

    if(!user.subjects){

        user.subjects = [];

    }

    if(!user.timetable){

        user.timetable = {};

    }

    if(!user.attendance){

        user.attendance = {};

    }

    if(!user.reminders){

        user.reminders = [];

    }

    if(!user.settings){

        user.settings = {

            theme:"light",

            primary:"#3032aa",

            notifications:{

                email:false,

                reminder:true,

                lowAttendance:true

            }

        };

    }

    return user;

}



// ======================================================
// LOAD USER
// ======================================================

function loadUser(){

    let user = checkLogin();

    if(!user){

        return null;

    }

    user = createDefaultUser(user);

    updateCurrentUser(user); 

    return user;

}