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
    elem = document.getElementById('footer').lastChild;
    footer.removeChild(elem);
    switch (state) {
        case "Student":
            status = 'Status <span class="badge badge-pill badge-success">Student</span>';
            appendObjectToFooter(status, 'status-div');
            break;
        case "Lecturer":
            status = 'Status <span class="badge badge-pill badge-warning">Lecturer</span>';
            appendObjectToFooter(status, 'status-div');
            break;
        case "Staff":
            status = 'Status <span class="badge badge-pill badge-info">Staff</span>';
            appendObjectToFooter(status, 'status-div');
            break;
        case "Admins":
            status = 'Status <span class="badge badge-pill badge-light">Admin</span>';
            appendObjectToFooter(status, 'status-div');
            break;
        default:
            status = 'Status <span class="badge badge-pill badge-danger">Anonymous</span>';
            appendObjectToFooter(status, 'status-div');
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
        incorrect_modal.style.display = "none";
        if (r[0] != void (0)) {
            document.getElementById("body").style.display = "none";
            document.getElementById("user-profile").style.display = "block";
        } else { incorrect_modal.style.display = "block"; }
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

function getBookInfo(itemSearch) {
    var search_data = itemSearch;

    var sql = "SELECT B.* FROM Book B WHERE B.Book_Title LIKE '%" + search_data + "%' \
              OR B.ISBN LIKE '%"+ search_data + "%'  OR B.Pub_ID LIKE '%" + search_data + "%' \
              OR B.Author LIKE '%"+ search_data + "%' OR B.Price LIKE '%" + search_data + "%' \
              OR B.Category LIKE '%"+ search_data + "%' ;";
    // console.log("sql: " + sql);
    connection.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("Return:", result);
        if (result[0] != void (0)) {
            var divElement;
            if (state != "Anonymous") {
                divElement = document.getElementById("bookshelf");
                while (elem = divElement.firstChild) {
                    divElement.removeChild(elem);
                }
            } else {
                divElement = document.getElementById("search-result");
                while (elem = divElement.firstChild) {
                    divElement.removeChild(elem);
                }
            }
            iter = 0;
            while (result[iter] != void (0)) {
                bookInfo = setBookInfo(result[iter]["Book_Title"],
                    result[iter]["Author"],
                    result[iter]["ISBN"],
                    result[iter]["Price"],
                    result[iter]["Pub_ID"],
                    result[iter]["Category"]);
                if (state != "Anonymous") {
                    appendBooktoBigBookshelf(bookInfo);
                } else {
                    appendBooktoSmallBookshelf(bookInfo);
                }
                iter += 1;
            }
            // while (elem = bookshelf.firstChild ) {
            //     bookshelf.removeChild(elem);
            // }


        } else {
            document.getElementById("content").innerText = "Cannot find your search request!";
            incorrect_modal.style.display = "block";
        }

    });
}

document.getElementById("search-btn").addEventListener("click", function (e) {
    data = document.getElementById("search-items").value;
    getBookInfo(data);
})

document
    .getElementById("btn-login")
    .addEventListener("click", function (e) {
        validateForm();
    });
