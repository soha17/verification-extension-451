$(document).ready(function () {
       document.getElementById("verify").addEventListener("click", function () {
         //TODO: check for login authentication! if No login throw error
          console.log("verify button");
          //make call to verification service to see if user is verified
          //if user is verified, check the form element for uni-verify to 1
          //let verificationSiganl = "0"; // api call and store the response in this.
          let verificationSiganl = $.get("http://127.0.0.1:5000/current-verification-status/jwick/", function(verificationStatus){
              verificationSiganl = JSON.stringify(verificationStatus);
              alert(verificationSiganl);
              return verificationSiganl
          });
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('in verify button tabs query');
            chrome.tabs.sendMessage(tabs[0].id, {greeting: verificationSiganl }, function(response) {
              console.log('in verify button send message');
              console.log(response.farewell);
            });
          });
       });
 });
