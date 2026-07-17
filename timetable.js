// ===================== TIMETABLE DATA =====================
let currentUser = loadUser();
let timetable = currentUser.timetable || {};

if(Object.keys(timetable).length === 0){

    timetable = {

        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []

    };

    currentUser.timetable = timetable;

    updateCurrentUser(currentUser);

}
function saveTimetable(){
    currentUser = loadUser();

    currentUser.timetable = timetable;

    updateCurrentUser(currentUser);

}

// ===================== CURRENT DAY =====================

let currentDay = "Monday";

// ===================== LOAD TABLE =====================

function loadTable(day){

    currentDay = day;

    const tbody = document.getElementById("timetableBody");

    tbody.innerHTML = "";

    timetable[day].forEach(function(item,index){

        tbody.innerHTML += `

        <tr>

            <td>${item.time}</td>

            <td>${item.subject}</td>

            <td>${item.professor}</td>

            <td>${item.room}</td>

            <td>

                <span class="edit" data-index="${index}">Edit</span>

                |

                <span class="delete" data-index="${index}">Delete</span>

            </td>

        </tr>

        `;

    });

    attachButtons();

}

// ===================== DAY BUTTONS =====================

const buttons=document.querySelectorAll(".m");

buttons.forEach(function(button){

    button.addEventListener("click",function(){

        buttons.forEach(function(btn){

            btn.classList.remove("active-day");

        });

        this.classList.add("active-day");

        loadTable(this.dataset.day);

    });

});

// ===================== ADD CLASS =====================

const addButton=document.querySelector(".n");

addButton.addEventListener("click", function(){

    let day = currentDay;

    let time = prompt("Enter Time");
    if(time == null || time.trim() == "") return;

    let subject = prompt("Enter Subject Name");
    if(subject == null || subject.trim() == "") return;

    let code = prompt("Enter Subject Code\n\nExample: EN101");
    if(code == null || code.trim() == "") return;

    let type = prompt("Enter Class Type\n\nLecture / Lab / Tutorial");
    if(type == null || type.trim() == "") return;

    let professor = prompt("Enter Professor Name");
    if(professor == null || professor.trim() == "") return;

    let room = prompt("Enter Room Number");
    if(room == null || room.trim() == "") return;

    timetable[day].push({

        time: time,

        subject: subject,

        code: code,

        type: type,

        professor: professor,

        room: room

    });
    saveTimetable();

loadTable(currentDay);

alert("Class Added Successfully");

});

// ===================== ATTACH EDIT & DELETE =====================

function attachButtons(){

    // EDIT

    document.querySelectorAll(".edit").forEach(function(button){

        button.onclick=function(){

            let index=this.dataset.index;

            let data=timetable[currentDay][index];

            let time=prompt("Edit Time",data.time);

            if(time==null) return;

            let subject=prompt("Edit Subject",data.subject);

            if(subject==null) return;

            let professor=prompt("Edit Professor",data.professor);

            if(professor==null) return;

            let room=prompt("Edit Room",data.room);

            if(room==null) return;

             let code = prompt("Edit Subject Code", data.code);
if(code == null) return;

let type = prompt("Edit Class Type", data.type);
if(type == null) return;

timetable[currentDay][index] = {

    time: time,
    subject: subject,
    code: code,
    type: type,
    professor: professor,
    room: room

};
            saveTimetable();

            loadTable(currentDay);

        };

    });



    // DELETE

    document.querySelectorAll(".delete").forEach(function(button){

        button.onclick=function(){

            let index=this.dataset.index;

            let ok=confirm("Delete this class ?");

            if(ok){

                timetable[currentDay].splice(index,1);
                saveTimetable();
                loadTable(currentDay);

            }

        };

    });

}

// ===================== LOAD DEFAULT =====================

window.addEventListener("load", function(){

    currentUser = loadUser();

    timetable = currentUser.timetable || {};

    const today = new Date();

const days = [

    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"

];

const todayName = days[today.getDay()];

if(timetable[todayName]){
    loadTable(todayName);
}
else{
    loadTable("Monday");
}
buttons.forEach(function(button){

    if(button.innerText === todayName){

        button.classList.add("active-day");
 
    }

});

});