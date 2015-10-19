/* global $ */

$(document).ready(function () {

  var d1 = new Date();
  var d2 = new Date();
  var sess = 25;

  d2.setMinutes(d1.getMinutes() + sess);

  console.log(d1);
  console.log(d2);
  
  setTimers();
  startTimer();

function startTimer(){
$('.timer').countdown(d2, function (event) {
    
    $(this).html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec')
      );
  });
}  

function setTimers(){ 

}

});

