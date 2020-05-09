//get the incorrect_modal
var incorrect_modal = document.getElementById("incorrect-modal");

//when the user clicks yes on incorrect modal, off the program
document.getElementById("btn-incorrect-yes").addEventListener("click", function (e) {
    incorrect_modal.style.display = "none";
})

//when the user clicks x, dothing
document.getElementById("btn-incorrect-x").addEventListener("click", function (e) {
    incorrect_modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, incorrect modal
window.onclick = function (event) {
    if (event.target == incorrect_modal) {
        incorrect_modal.style.display = "none";
    }
}


function validateForm() {
    var user_id = document.forms["loginForm"]["userID"].value;
    var user_password = document.forms["loginForm"]["userPassword"].value;
    var user_role = document.forms["loginForm"]["userRole"].value;

    var id = "admin";
    var password = "12345"
    var role = "Admin";
    var name = "Administrator";

    if (user_id == "") {
        document.getElementById("content").innerText = "The UserID is empty";
        incorrect_modal.style.display = "block";
    }
    else if (user_password == "") {
        document.getElementById("content").innerText = "The Password is empty";
        incorrect_modal.style.display = "block";
    }
    else if (user_role == "") {
        document.getElementById("content").innerText = "The Role is empty";
        incorrect_modal.style.display = "block";
    } else
    if (user_id == id){
        if (user_password = password && user_role == role) {
            document.getElementById("content").innerText = "Login Successfully!\nWelcome " + name;
            // alert("Hi");
            incorrect_modal.style.display = "block";
            document.getElementById("btn-status").innerText = "WTF";
            // Status <span class=&quot;badge badge-pill badge-danger&quot;>Anonymous</span>
        }
    }
    else {
        document.getElementById("content").innerText = "The UserID or Password or Role is incorrect or empty";
        incorrect_modal.style.display = "block";
    }
}