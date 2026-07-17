// ===============================
// DASHBOARD SCRIPT - PART 1
// ===============================


// ===============================
// LOAD CURRENT USER
// ===============================

 

const user = loadUser();




// ===============================
// TODAY DATE AND DAY
// ===============================

function updateDate(){

    const dateElement = document.getElementById("todayDate");
    const dayElement = document.getElementById("todayDay");


    const today = new Date();


    const options = {
        day:"numeric",
        month:"long",
        year:"numeric"
    };


    const dayOptions = {
        weekday:"long"
    };


    if(dateElement){

        dateElement.innerHTML =
        today.toLocaleDateString("en-IN", options);

    }


    if(dayElement){

        dayElement.innerHTML =
        today.toLocaleDateString("en-IN", dayOptions);

    }


}


updateDate();




// ===============================
// LOAD SUBJECTS
// ===============================

function loadSubjects(){

    if(!user){
        return [];
    }

    const timetable = user.timetable || {};

    const subjects = [];

    const added = new Set();

    Object.values(timetable).forEach(day=>{

        day.forEach(cls=>{

            if(!added.has(cls.subject)){

                added.add(cls.subject);

                subjects.push({

                    name: cls.subject,
                    code: cls.code || "-",
                    type: cls.type || "Lecture",
                    status: "Active"

                });

            }

        });

    });

    return subjects;

}



const subjects = loadSubjects();




// ===============================
// TOTAL SUBJECT CARD
// ===============================

function updateTotalSubjects(){

    const element =
    document.getElementById("totalSubjectCount");

    if(element){

        element.innerText =
        subjects.length;

    }

}



// ===============================
// LOAD ATTENDANCE DATA
// ===============================

function getAttendance(){

    const user = loadUser();

    if(!user){

        return {};

    }

    return user.attendance || {};

}





// ===============================
// CALCULATE ATTENDANCE
// ===============================

function calculateAttendance(){

    const attendance = getAttendance();

    let total = 0;
    let present = 0;

    Object.values(attendance).forEach(function(day){

        day.classes.forEach(function(cls){

            if(cls.status === "Present" || cls.status === "Absent"){

                total++;

            }

            if(cls.status === "Present"){

                present++;

            }

        });

    });

    if(total === 0){

        return 0;

    }

    return Math.round((present / total) * 100);

}





// ===============================
// UPDATE ATTENDANCE CARD
// ===============================

function updateAttendanceCard(){

    const attendance = getAttendance();

    let total = 0;
    let present = 0;

    Object.values(attendance).forEach(function(day){

        day.classes.forEach(function(cls){

            if(cls.status === "Present" || cls.status === "Absent"){

                total++;

            }

            if(cls.status === "Present"){

                present++;

            }

        });

    });

    const average =
    total === 0 ? 0 :
    Math.round((present / total) * 100);

    const averageElement =
    document.getElementById("averageAttendance");

    if(averageElement){

        averageElement.innerText =
        average + "%";

    }

    const attendedElement =
    document.getElementById("classAttended");

    if(attendedElement){

        attendedElement.innerText =
        present;

    }

}






// ===============================
// UPDATE DASHBOARD CARDS
// ===============================

function updateCards(){


    updateTotalSubjects();


    updateAttendanceCard();



}


updateCards();



// ===============================
// LOAD TODAY'S SUBJECTS FROM TIMETABLE
// ===============================

 




 




 
// ===============================
// DASHBOARD SCRIPT - PART 2
// ===============================


// ===============================
// SUBJECT WISE ATTENDANCE
// ===============================

function calculateSubjectAttendance(subjectName){

    const attendance = getAttendance();

    let total = 0;
    let present = 0;

    Object.values(attendance).forEach(function(day){

        day.classes.forEach(function(record){

            if(record.subject === subjectName){

                total++;

                if(record.status === "Present"){

                    present++;

                }

            }

        });

    });

    if(total === 0){

        return 0;

    }

    return Math.round((present / total) * 100);

}





// ===============================
// LOAD ATTENDANCE OVERVIEW
// ===============================

function loadAttendanceOverview(){


    const container =
    document.getElementById("subjectContainer");



    if(!container){

        return;

    }



    container.innerHTML = "";



    subjects.forEach(subject=>{


        const percentage =
        calculateSubjectAttendance(subject.name);



        const card =
        document.createElement("div");


        card.className =
        "subject-attendance-card";



        card.innerHTML = `

<div class="subject-top">

    <span class="subject-name">
        ${subject.name}
    </span>

    <span class="subject-percent">
        ${percentage}%
    </span>

</div>

<div class="subject-code">
    ${subject.code || ""}
</div>

<div class="progress-bar">

    <div
        class="progress-fill"
        style="width:${percentage}%">
    </div>

</div>

`;



        container.appendChild(card);



    });



}





// ===============================
// SUBJECT FILTER
// ===============================


function setupSubjectFilter(){


    const filter =
    document.getElementById("subjectFilter");



    if(!filter){

        return;

    }




    filter.innerHTML = `

        <option value="all">
            All Subjects
        </option>

    `;



    subjects.forEach(subject=>{


        const option =
        document.createElement("option");



        option.value =
        subject.name;



        option.textContent =
        subject.name;



        filter.appendChild(option);


    });




    filter.addEventListener("change",function(){


        const value =
        this.value;



        const cards =
        document.querySelectorAll(
            ".subject-attendance-card"
        );



        cards.forEach(card=>{


            const name =
            card.querySelector(
                ".subject-name"
            ).innerText;



            if(value==="all" || name===value){


                card.style.display =
                "block";


            }

            else{


                card.style.display =
                "none";


            }



        });



    });



}





// ===============================
// OVERALL ATTENDANCE MESSAGE
// ===============================


function attendanceStatus(){


    const percentage =
    calculateAttendance();



    const status =
    document.getElementById(
        "attendanceStatus"
    );



    if(!status){

        return;

    }



    if(percentage>=75){


        status.innerHTML =
        "Good Attendance";


    }


    else{


        status.innerHTML =
        "Attendance Below 75%";


    }



}




// Run Part 2 functions

loadAttendanceOverview();

setupSubjectFilter();

attendanceStatus();
// ===============================
// DASHBOARD SCRIPT - PART 3
// ===============================


// ===============================
// CALCULATE CLASSES NEEDED
// ===============================

function calculateClassesNeeded(){

    const attendance = getAttendance();

    let total = 0;
    let present = 0;

    Object.values(attendance).forEach(function(day){

        day.classes.forEach(function(cls){

            if(cls.status === "Present" || cls.status === "Absent"){

                total++;

            }

            if(cls.status === "Present"){

                present++;

            }

        });

    });

    let needed = 0;

    if(total > 0){

        while(((present + needed) / (total + needed)) * 100 < 75){

            needed++;

        }

    }

    const element =
    document.getElementById("classNeeded");

    if(element){

        element.innerText = needed;

    }

}
function loadNeededSubjects(){

    const container =
    document.getElementById("neededContainer");

    if(!container){

        return;

    }

    container.innerHTML = "";

    subjects.forEach(function(subject){

        let total = 0;
        let present = 0;

        Object.values(getAttendance()).forEach(function(day){

            day.classes.forEach(function(cls){

                if(cls.subject === subject.name){

                    total++;

                    if(cls.status === "Present"){

                        present++;

                    }

                }

            });

        });

        let percent = 0;

        if(total > 0){

            percent =
            Math.round((present/total)*100);

        }

        let need = 0;

        if(total > 0){

            while(((present+need)/(total+need))*100 < 75){

                need++;

            }

        }

        container.innerHTML += `

        <div class="needed-card">

            <h4>${subject.name}</h4>

            <p>Attendance : ${percent}%</p>

            <p>

                ${
                    need===0
                    ? "Target Achieved ✅"
                    : "Need " + need + " class(es)"
                }

            </p>

        </div>

        `;

    });

}




// ===============================
// DISPLAY TODAY'S CLASSES
// ===============================

 






// ===============================
// UPDATE QUICK INFO
// ===============================

 





// ===============================
// SIDEBAR ACTIVE PAGE
// ===============================

function setActiveSidebar(){


    const links =
    document.querySelectorAll(
        ".sidebar a"
    );



    const current =
    window.location.pathname
    .split("/")
    .pop();



    links.forEach(link=>{


        if(
            link.getAttribute("href")
            === current
        ){

            link.classList.add(
                "active"
            );

        }


    });


}





// ===============================
// INITIALIZATION
// ===============================

document.addEventListener(
"DOMContentLoaded",
function(){


    updateDate();


    updateCards();


    loadAttendanceOverview();


    setupSubjectFilter();


    calculateClassesNeeded();


    

loadNeededSubjects();
     


    setActiveSidebar();


});