function showform() {
  if(document.getElementById("login").style.display === 'none') {
    document.getElementById("login").style.display = 'block';
  }
}

$(document).ready(function () {
  console.log('in loginbutton.js');
  //code goes here
  if(document.getElementById("logout")){
       //your code goes here
       document.getElementById("logout").addEventListener("click", function () {
         //TODO: check for login authentication! if No login throw error that cant logout
          console.log("logout button");
          showform();

          //show login form after user logs out
       })

   }
 })
