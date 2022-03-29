console.log('in register.js file');
$(document).ready(function () {
  console.log('in register.js');
  // var urlR = "http://localhost:3000/register";
  var urlR = "http://127.0.0.1:5000/register";
  document.getElementById("registerLink").addEventListener("click", function () {
    chrome.tabs.create({active:true, url: urlR});
  });
});
