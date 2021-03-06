function hideform() {
  document.getElementById("login").style.display = 'none';
  $("#welcome").append('<div><br><br><h2>Welcome you are logged in!!</h2></div>');
}

$(document).ready(function () {
  console.log('in loginbutton.js');
  document.getElementById("log").addEventListener("click", function () {
    var username = document.getElementById("Uname").value;
    if(username==""){
      alert("Please input your name");
      return false;
    }
    //Source: Password verification can be found at https://www.w3schools.com/howto/howto_js_password_validation.asp
    var properusername=/^[a-z ,.'-]+$/i;
    if(username.match(properusername)){
    var password = document.getElementById("Pass").value;
    if(password==""){
      alert("Please input a password");
      return false;
    }
    var properpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password.match(properpassword)){
    var hashing = new jsSHA("SHA-512", "TEXT", {numRounds: 1});  //Source: jsSHA implementation can be found at https://github.com/Caligatio/jsSHA
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
          hideform();
          //handle valid login
        })
        .fail(function(error){
          console.log(error);
        });
      });
      console.log("after ajax");
});
