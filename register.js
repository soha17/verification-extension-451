console.log('in register.js file');
$(document).ready(function () {
  console.log('in register.js');
  var urlR = "http://localhost:3000/register";
  document.getElementById("registerLink").addEventListener("click", function () {
    chrome.tabs.create({active:true, url: urlR});
  });
});
