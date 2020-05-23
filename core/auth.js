//get the incorrect_modal
var incorrect_modal = document.getElementById("incorrect-modal");
var state = "Anonymous";

//when the user clicks yes on incorrect modal, off the program
document
    .getElementById("btn-incorrect-yes")
    .addEventListener("click", function (e) {
        incorrect_modal.style.display = "none";
    });

//when the user clicks x, dothing
document
    .getElementById("btn-incorrect-x")
    .addEventListener("click", function (e) {
        incorrect_modal.style.display = "none";
    });

// When the user clicks anywhere outside of the modal, incorrect modal
window.onclick = function (event) {
    if (event.target == incorrect_modal) {
        incorrect_modal.style.display = "none";
    }
};

function returnRole(state) {
    switch (state) {
        case "Student":
            document.getElementById("status-btn").innerText =
                "Status <span class=&quot;badge badge-pill badge-success&quot;>Student</span>";
            break;
        case "Lecturer":
            document.getElementById("status-btn").innerText =
                "Status <span class=&quot;badge badge-pill badge-warning&quot;>Lecturer</span>";
            break;
        case "Staff":
            document.getElementById("status-btn").innerText =
                "Status <span class=&quot;badge badge-pill badge-info&quot;>Staff</span>";
            break;
        case "Admin":
            document.getElementById("status-btn").innerText =
                "Status <span class=&quot;badge badge-pill badge-light&quot;>Admin</span>";
            break;
        default:
            document.getElementById("status-btn").innerText =
                "Status <span class=&quot;badge badge-pill badge-danger&quot;>Anonymous</span>";
    }
}

function validate(id, password, role) {
    var sql_role =
        "SELECT u.User_ID FROM Library.User u, Library." +
        role +
        " WHERE u.User_ID='" +
        id +
        "' AND " +
        role +
        ".User_ID = u.User_ID";

    var sql =
        "SELECT u.User_Name FROM Library.User u WHERE u.User_ID='" +
        id +
        "' AND u.User_Password = '" +
        password +
        "'";

    var name = "";
    // console.log(sql);
    connection.query(sql, function (e, result) {
        if (e) throw e;
        if (result[0] != void (0)) {
            // name = result[0]["User_Name"];
            // console.log(name);
            document.getElementById("content").innerText =
                "Sorry " + id + " !\nPlease check your login information again.";
            incorrect_modal.style.display = "block";
            return;
            // alert("Hi");
        } else {
            document.getElementById("content").innerText =
                "The UserID or Password or Role is incorrect or empty";
            return;
        }
    });
    connection.query(sql_role, function (e, r) {
        if (e) throw e;
        // console.log(r[0]);
        incorrect_modal.style.display = null;
        if (r[0] != void (0)) {
            while (elem = body.firstChild) {
                body.removeChild(elem);
            }
            appendObjectToBody(mainBody);
            incorrect_modal.style.display = null;
        } else {incorrect_modal.style.display = "block";}
      
    })

    return;


}

function validateForm() {
    var user_id = document.forms["loginForm"]["userID"].value;
    var user_password = document.forms["loginForm"]["userPassword"].value;
    var user_role = document.forms["loginForm"]["userRole"].value;

    if (user_id == "") {
        document.getElementById("content").innerText = "The UserID is empty";
        incorrect_modal.style.display = "block";
    } else if (user_password == "") {
        document.getElementById("content").innerText = "The Password is empty";
        incorrect_modal.style.display = "block";
    } else if (user_role == "") {
        document.getElementById("content").innerText = "The Role is empty";
        incorrect_modal.style.display = "block";
    } else {
        validate(user_id, user_password, user_role);
    }
}

document
    .getElementById("btn-login")
    .addEventListener("click", function (e) {
        validateForm();
    });
