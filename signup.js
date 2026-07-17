console.log("Signup page loaded");

// Select the form
const signupForm = document.querySelector("#signupForm");

// Select all inputs
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const roll = document.querySelector("#roll");
const mobile = document.querySelector("#mobile");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const terms = document.querySelector("#terms");

// Listen for form submission
signupForm.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    // Read values
    const nameValue = fullName.value;
    const emailValue = email.value;
    const rollValue = roll.value;
    const mobileValue = mobile.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    const termsValue = terms.checked;

    // Print values
    console.log("Name:", nameValue);
    console.log("Email:", emailValue);
    console.log("Roll:", rollValue);
    console.log("Mobile:", mobileValue);
    console.log("Password:", passwordValue);
    console.log("Confirm Password:", confirmPasswordValue);
    console.log("Terms Accepted:", termsValue);
    
    if(nameValue.trim() ==="" || emailValue.trim()==="" || rollValue.trim()==="" || mobileValue.trim()==="" || passwordValue.trim()==="" || confirmPasswordValue.trim()===""  ){
        alert("Please fill all fields");
        return;
    }
    if(confirmPasswordValue !== passwordValue){
        alert("Password do not match ");
        return;
    }
    if(!termsValue){
        alert(" Please accept Term & Condition");
        return ;
    }
     const user = {

    name: nameValue,

    email: emailValue,

    roll: rollValue,

    mobile: mobileValue,

    password: passwordValue,


    subjects: [],


    timetable: {

        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []

    },


    attendance: {},


    reminders: [],


    settings: {

        theme: "light",

        primary: "#3032aa",

        notifications: {

            email: false,

            reminder: true,

            lowAttendance: true

        }

    }

};
    let users = JSON.parse(localStorage.getItem("users")) || [];


// Check duplicate email

const existingUser = users.find(function(item){

    return item.email === emailValue;

});


if(existingUser){

    alert("Email already registered!");

    return;

}


// Save new user

users.push(user);

localStorage.setItem(
    "users",
    JSON.stringify(users)
);


    alert("Signup Succesfully!");
    window.location.href = "login.html";
}); 