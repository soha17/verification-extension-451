$(document).ready(function () {
       document.getElementById("verify").addEventListener("click", function () {
         //TODO: check for login authentication! if No login throw error
          console.log("verify button");
          //make call to verification service to see if user is verified
          //if user is verified, check the form element for uni-verify to 1
          //let verificationSiganl = "0"; // api call and store the response in this.




          var otp_veri = document.getElementById("otp").value;
          if(otp_veri==""){
            var url = "https://api.twilio.com/2010-04-01/Accounts/ADD ACCOUNT SID HERE/Messages";

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization", "Basic " + btoa("ADD ACCOUNT SID HERE:ADD AUTH TOKEN HERE"));
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send("Body=Welcome to Uni-Verify! Your OTP is 451154&To=+14127421854&From=+19377447376");
            xhr.onreadystatechange = function () {
                 if (xhr.readyState === 4) {
                   console.log(xhr.status);
                   console.log(xhr.responseText);
                 }};
          }
          else if(otp_veri!="451154"){
            alert("Incorrect OTP");
            return false;
          }
          else if(otp_veri=="451154"){


          let verificationSiganl = $.get("http://127.0.0.1:5000/current-verification-status/jwick/", function(verificationStatus){
              verificationSiganl = JSON.stringify(verificationStatus);
              // alert(verificationSiganl);
              return verificationSiganl
          });
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('in verify button tabs query');
            chrome.tabs.sendMessage(tabs[0].id, {greeting: verificationSiganl }, function(response) {
              console.log('in verify button send message');
              console.log(response.farewell);
            });
          });
        }
       });
 });
