// function hideform() {
//   form.style.display = 'none';
// }

$(document).ready(function () {
  console.log('in loginbutton.js');
  //code goes here
  document.getElementById("log").addEventListener("click", function () {
    var username = document.getElementById("Uname").value;
    var password = document.getElementById("Pass").value;  //add security , hash + salting blah blah, OAuth2 by google 
    $.ajax({
            type: "POST",
            url: "http://localhost:3000/loginRequest",
            contentType:"json",
            data: JSON.stringify({
              username: username,
              password: password,
            })
        })
        .done(function(response) {
          console.log("in done");
          console.log(response);
          // hideform();
          //handle valid login
        })
        .fail(function(error){
          console.log(error);
        });
      });
      console.log("after ajax");
});
