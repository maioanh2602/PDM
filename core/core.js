const {remote, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

  // document.getElementById("min-btn").addEventListener("click", function (e) {
  //      var window = remote.getCurrentWindow();
  //      window.minimize();
  // });
  //
  // document.getElementById("max-btn").addEventListener("click", function (e) {
  //      var window = remote.getCurrentWindow();
  //      if (!window.isMaximized()) {
  //          window.maximize();
  //      } else {
  //          window.unmaximize();
  //      }
  // });
  
  //get the close_modal
  var close_modal = document.getElementById("close-modal");

  // When the user clicks on the button, open the modal
  document.getElementById("close-btn").addEventListener("click", function (e) {
    close_modal.style.display = "block";
    });

  //when the user clicks yes on close modal, off the program
  document.getElementById("btn-close-yes").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
    });

  //when the user clicks x, dothing
 document.getElementById("btn-close-x").addEventListener("click", function (e) {
  close_modal.style.display = "none"; })

  // When the user clicks anywhere outside of the modal, close modal
  window.onclick = function(event) {
    if (event.target == close_modal) {
      close_modal.style.display = "none";
     }
   }

   // when press Alt + F4, show close modal
   document.onkeydown = keydown;
   function keydown(event) {
     if (!event) event = event;
     if (event.altKey && event.keyCode==115) {
      close_modal.style.display = "block";
     }
   }

