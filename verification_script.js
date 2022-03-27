console.log('in contect script');
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === 1) {
      if($("#uni-verify-signal").val() !== '1'){
        $("#uni-verify-signal").val('1');
        $(".univerify").append('<div><div id="uni-verify-image"><p> You are uni-verified </p><img src="https://www.freeiconspng.com/uploads/checkmark-png-28.png" id="univerify-img" alt="uni-verify" height="36" width="36" /></div></div>');

      } else {
          $("#uni-verify-signal").val('-1');
          $(".univerify").append('<div> <p> uni-verify was unable to verify you. You can still submit your request, the Data broker will verify your identity! </p></div>');
        }

    }

    sendResponse({farewell: "goodbye"});
  });
