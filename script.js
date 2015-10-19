/* global $ */

$(document).ready(function () {

  var $clock = $('.timer');
  var d1 = new Date();
  var d2 = new Date();
  var sess = 25;
  d2.setMinutes(d1.getMinutes() + sess);

  console.log(d1);
  console.log(d2);

  startTimer();

  function startTimer() {

    $($clock).countdown(d2, function (event) {
      $(this).html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec')
        );
    });

  }

  function preset25Minutes() {
    var d1 = new Date();
    var d2 = new Date();
    var sess = 25;
    return d2.setMinutes(d1.getMinutes() + sess);

  }

  $('#timer-reset').click(function () {
    $clock.countdown(preset25Minutes());
  });

  $('#timer-pause').click(function () {
    $clock.countdown('pause');
  });

  $('#timer-resume').click(function () {
    $clock.countdown('resume');
  });

});
