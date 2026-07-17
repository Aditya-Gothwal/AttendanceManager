 
// ================= GET ATTENDANCE DATA =================


let currentUser = loadUser();

let attendanceData =
currentUser.attendance || {};

if(Object.keys(attendanceData).length === 0){

    document.getElementById("subjectRows").innerHTML =
    `
    <div class="subject-row">
        No attendance data available
    </div>
    `;

}



// ================= SUMMARY =================


let totalClasses = 0;

let attendedClasses = 0;
 
let missedClasses = 0;



Object.values(attendanceData).forEach(day => {


    day.classes.forEach(cls => {


    if(cls.status === "Present" || cls.status === "Absent"){


        totalClasses++;


        if(cls.status === "Present"){

            attendedClasses++;

        }


        if(cls.status === "Absent"){

            missedClasses++;

        }


    }


});


});





let overallPercentage =
totalClasses === 0
?
0
:
Math.round(
    (attendedClasses / totalClasses) * 100
);





// Update cards


document.getElementById("c1").innerText =
overallPercentage + "%";


document.getElementById("c2").innerText =
totalClasses;


document.getElementById("c3").innerText =
attendedClasses;


document.getElementById("c4").innerText =
missedClasses;









// ================= SUBJECT REPORT =================



let subjects = {};




Object.values(attendanceData).forEach(day => {


    day.classes.forEach(cls => {



        if(!subjects[cls.subject]){


            subjects[cls.subject] = {

                total:0,

                present:0,

                absent:0

            };


        }





        if(cls.status === "Present" || cls.status === "Absent"){

    subjects[cls.subject].total++;

}




        if(cls.status === "Present"){

            subjects[cls.subject].present++;

        }




        if(cls.status === "Absent"){

            subjects[cls.subject].absent++;

        }




    });



});








let subjectRows =
document.getElementById("subjectRows");



subjectRows.innerHTML="";





Object.keys(subjects).forEach(subject => {



    let data = subjects[subject];



    let percentage =
    Math.round(
        (data.present / data.total) * 100
    );





    subjectRows.innerHTML += `


    <div class="subject-row">


        <div>
            ${subject}
        </div>



        <div>
            ${percentage}%
        </div>



        <div>


            <div class="progress">


                <div 
                class="progress-fill"
                style="width:${percentage}%">

                </div>


            </div>



        </div>



    </div>



    `;



});









// ================= ATTENDANCE TREND =================



let dates = [];

let trendData = [];





Object.keys(attendanceData)
.sort()
.forEach(date => {



    let classes =
    attendanceData[date].classes;



    let present = 0;




    classes.forEach(cls => {



        if(cls.status === "Present"){

            present++;

        }


    });





    let percentage =
    classes.length === 0
    ?
    0
    :
    Math.round(
        (present/classes.length)*100
    );




    dates.push(date);


    trendData.push(percentage);



});









// ================= CHART =================



let chartElement =
document.getElementById("attendanceChart");





if(chartElement && dates.length > 0){



new Chart(chartElement, {


    type:"line",



    data:{


        labels:dates,


        datasets:[{

            label:"Attendance %",


            data:trendData,


            tension:0.3,


            fill:false


        }]


    },




    options:{


        responsive:true,



        scales:{


            y:{


                beginAtZero:true,

                max:100


            }


        }


    }



});
 


}