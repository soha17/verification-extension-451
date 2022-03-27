// function hideform() {
//   form.style.display = 'none';
// }

$(document).ready(function () {
  console.log('in loginbutton.js');
  //code goes here
  document.getElementById("log").addEventListener("click", function () {
    var username = document.getElementById("Uname").value;
    if(username==""){
      alert("Please input your name");
      return false;
    }
    var properusername=/^[a-z ,.'-]+$/i;
    if(username.match(properusername)){
    var password = document.getElementById("Pass").value;
    if(password==""){
      alert("Please input a password");
      return false;
    }
    var properpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password.match(properpassword)){
    var hashing = new jsSHA("SHA-512", "TEXT", {numRounds: 1});  //jsSHA implementation can be found at https://github.com/Caligatio/jsSHA
    hashing.update(password);
    var final_hash = hashing.getHash("HEX");
    password = final_hash;
  }
    else{
      alert("Please input a password that is atleast 6 characters and has one numeric digit and uppercase and lowercase letter");
      return false;
    }}
    else{
      alert("Please input your name ");
      return false;
    }
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
