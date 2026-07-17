// ================= DATE =================
let currentUser = loadUser();
const today = new Date();


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];



const currentDay = weekDays[today.getDay()];


const dateKey =
today.getFullYear() + "-" +
String(today.getMonth()+1).padStart(2,"0") + "-" +
String(today.getDate()).padStart(2,"0");



const todayDate =

today.getDate() +
" " +
months[today.getMonth()] +
" " +
today.getFullYear() +
", " +
currentDay;



document.getElementById("todayDate").innerText =
todayDate;



// ================= TIMETABLE =================


let timetable =
currentUser.timetable || {};



if(Object.keys(timetable).length === 0){

    timetable = {

        Monday:[],
        Tuesday:[],
        Wednesday:[],
        Thursday:[],
        Friday:[],
        Saturday:[],
        Sunday:[]

    };

    currentUser.timetable = timetable;

    updateCurrentUser(currentUser);

}



// ================= ATTENDANCE DATA =================


let attendanceData =
currentUser.attendance || {};



let todayAttendance = [];



// ================= CONTAINER =================


const container =
document.getElementById("attendanceContainer");




// ================= SHOW TODAY CLASSES =================


function displayTodayClasses(){


    container.innerHTML="";


    let todayClasses =
    timetable[currentDay];



    if(!todayClasses || todayClasses.length===0){


        container.innerHTML = `

        <div class="class-card">

            <div class="left">

                <h3>No Classes Today</h3>

            </div>

        </div>

        `;


        return;

    }




     todayAttendance =
todayAttendance.length === todayClasses.length
    ? todayAttendance
    : new Array(todayClasses.length).fill("");




    todayClasses.forEach(function(classData,index){



        container.innerHTML += `


        <div class="class-card">


            <div class="left">

                <h3>${classData.subject}</h3>

                <span>${classData.time}</span>

            </div>



            <div class="right">


                <button class="present-btn"
                data-index="${index}">

                Present

                </button>



                <button class="absent-btn"
                data-index="${index}">

                Absent

                </button>


            </div>


        </div>


        `;



    });



    attachAttendanceButtons();


    loadAttendance();


}







// ================= BUTTON EVENTS =================


function attachAttendanceButtons(){



const presentButtons =
document.querySelectorAll(".present-btn");



const absentButtons =
document.querySelectorAll(".absent-btn");





presentButtons.forEach(button=>{


button.onclick=function(){


let index=this.dataset.index;



todayAttendance[index]="Present";



this.style.background="#22C55E";

this.style.color="white";



this.nextElementSibling.style.background="#FEE2E2";

this.nextElementSibling.style.color="#EF4444";


 


};



});






absentButtons.forEach(button=>{


button.onclick=function(){


let index=this.dataset.index;



todayAttendance[index]="Absent";



this.style.background="#EF4444";

this.style.color="white";



this.previousElementSibling.style.background="#DCFCE7";

this.previousElementSibling.style.color="#22C55E";


 


};



});



}






// ================= SAVE ATTENDANCE =================


function saveAttendance(){



let todayClasses =
timetable[currentDay];



attendanceData[dateKey]={


    day:currentDay,


    classes:todayClasses.map((classData,index)=>{


        return {


            subject:classData.subject,


            time:classData.time,


            status:
            todayAttendance[index] || "Not Marked"


        };


    })


};


currentUser = loadUser();

currentUser.attendance = attendanceData;

updateCurrentUser(currentUser);



alert("Attendance Saved Successfully!");



}







// ================= LOAD ATTENDANCE =================


function loadAttendance(){



let saved =
attendanceData[dateKey];



if(!saved)
return;




saved.classes.forEach((item,index)=>{


todayAttendance[index]=item.status;



});



updateButtons();



}








// ================= RESTORE BUTTON COLORS =================


function updateButtons(){



const presentButtons =
document.querySelectorAll(".present-btn");



const absentButtons =
document.querySelectorAll(".absent-btn");





todayAttendance.forEach((status,index)=>{



if(status==="Present"){


presentButtons[index].style.background="#22C55E";

presentButtons[index].style.color="white";


}



if(status==="Absent"){


absentButtons[index].style.background="#EF4444";

absentButtons[index].style.color="white";


}



});



}







// ================= SUMMARY =================


 






// ================= SAVE BUTTON =================


document.querySelector(".save-btn")
.addEventListener("click",saveAttendance);







// ================= START APP =================


window.addEventListener("load", function(){

    currentUser = loadUser();

    timetable =
    currentUser.timetable || {};

    attendanceData =
    currentUser.attendance || {};

    displayTodayClasses();

     

});