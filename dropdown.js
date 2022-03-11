// $(document).ready(function () {
//     $('#name').keyup(function () {
//     $('#greet').text('Hello ' + $('#name').val()) ;
//    });
//    });

var myLink = document.getElementById('clickMe');

myLink.onclick = function(){

    var t = document.getElementById("123");
    if(t.innerHTML=="Not Verified"){
      t.innerHTML="Verified";}
    else{
      t.innerHTML="Not Verified";}

    var background = document.getElementById("clickMe").style.backgroundColor;
    if (background == "whitesmoke") {
        document.getElementById("clickMe").style.background = "rgb(70,150,20)";
        document.getElementById("clickMe").textContent = "Congrats";
    } else {
        document.getElementById("clickMe").style.background = "whitesmoke";
        document.getElementById("clickMe").textContent = "Verify Me";
    }

}