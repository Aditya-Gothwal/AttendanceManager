// ================= SUBJECT DATA =================
let currentUser = loadUser();

let timetable = currentUser.timetable || {};

let subjects = [];

let addedSubjects = new Set();

Object.values(timetable).forEach(function(day){

    day.forEach(function(cls){

        if(!addedSubjects.has(cls.subject)){

            addedSubjects.add(cls.subject);

            subjects.push({

                name: cls.subject,

                code: cls.code || "-",

                type: cls.type || "Lecture",

                status: "Active"

            });

        }

    });

});
let attendance = currentUser.attendance || {};
 



// ================= DISPLAY SUBJECT =================

function displaySubjects(){

    let table = document.getElementById("subjectTable");

    table.innerHTML="";


    subjects.forEach((subject,index)=>{


        let row = document.createElement("tr");


        row.innerHTML = `

        <td>${index+1}</td>

        <td>${subject.name}</td>

        <td>${subject.code}</td>

        <td>${subject.type}</td>

        <td>${subject.status}</td>


         

        `;


        table.appendChild(row);


    });



    updateCards();
 


    
}

 




// ================= ADD SUBJECT =================

 





// ================= DELETE =================


 






// ================= EDIT =================


 






// ================= CARD UPDATE =================


function updateCards(){


document.getElementById("totalSubjects")
.innerText = subjects.length;



document.getElementById("activeSubjects")
.innerText =
subjects.filter(
s=>s.status==="Active"
).length;



document.getElementById("inactiveSubjects")
.innerText =
subjects.filter(
s=>s.status==="Inactive"
).length;



document.getElementById("archivedSubjects")
.innerText=0;



}
// ================= SEARCH SUBJECT =================

document
.getElementById("searchSubject")
.addEventListener("keyup", function(){

    let searchValue = this.value.toLowerCase();


    let rows = document.querySelectorAll("#subjectTable tr");


    rows.forEach(row=>{


        let text = row.innerText.toLowerCase();


        if(text.includes(searchValue)){

            row.style.display = ""; 

        }
        else{

            row.style.display = "none";

        }


    });


});




// LOAD DATA

window.addEventListener("load", function(){

    currentUser = loadUser();

    timetable = currentUser.timetable || {};

    subjects = [];

    let addedSubjects = new Set();

    Object.values(timetable).forEach(function(day){

        day.forEach(function(cls){

            if(!addedSubjects.has(cls.subject)){

                addedSubjects.add(cls.subject);

                subjects.push({

                    name: cls.subject,

                    code: cls.code || "-",

                    type: cls.type || "Lecture",

                    status: "Active"

                });

            }

        });

    });

    displaySubjects();

})  ;
function updateNeededClasses(){


    const container =
    document.getElementById("neededContainer");


    container.innerHTML="";


    subjects.forEach(function(subject){


        let total = 0;

        let present = 0;



        Object.values(attendance).forEach(function(day){


            day.classes.forEach(function(cls){


                if(cls.subject === subject.name){

                    total++;

                }


                if(
                    cls.subject === subject.name &&
                    cls.status === "Present"
                ){

                    present++;

                }


            });


        });



        let needed = 0;


        if(total > 0){


            let percentage =
            (present/total)*100;


            if(percentage < 75){


                needed =
                Math.ceil(
                (0.75*total-present)/0.25
                );


            }


        }



        if(needed > 0){


            container.innerHTML += `


            <div class="list">

                ${subject.name}

                <span class="number">
                ${needed}
                </span>

            </div>


            `;


        }



    });


}