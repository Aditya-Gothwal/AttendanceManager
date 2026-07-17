console.log(" new Login page loaded");

const loginForm = document.querySelector("#loginForm");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const remember = document.querySelector("#remember");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const emailValue = email.value.toLowerCase().trim();
const passwordValue = password.value.trim();

    if(emailValue === "" || passwordValue === ""){
        alert("Please fill all fields");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];

        console.log(users);

        const foundUser = users.find(function(user){

        return user.email === emailValue &&
           user.password === passwordValue;

        });

    if(foundUser){

    saveCurrentUser(foundUser);

    alert("Login Successful!");

    window.location.href = "index.html";

}
    else{

        alert("Invalid Email or Password");

    }
     
});