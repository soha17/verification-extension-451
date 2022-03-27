console.log("in privacy");
$(document).ready(function () {
  console.log('in privacy.js');
  var urlR = "http://localhost:3000/privacyPolicy";
  document.getElementById("PrivacyLink").addEventListener("click", function () {
    chrome.tabs.create({active:true, url: urlR});
  });
});
