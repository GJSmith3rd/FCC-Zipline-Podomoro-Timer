/* global $ */

$(document).ready(function () {

  var resumeMin;
  var pauseMin;
  var duration = new Date();

  // set url for sounds on google drive public
  var soundLocation = 'https://7b313a9f7606490ebe3c2c7d078512212b272396.googledrive.com/';
  soundLocation += 'host/0BxHL3kJgWo5eT1NpOW8zbzB0SzQ/sounds/';

  $.ionSound({
    sounds: [
      {
        name: 'bell_ring'
      },
      {
        name: 'snap'
      }
    ],
    volume: 0.1,
    multiplay: true,
    path: soundLocation,
    preload: true
  });

  var $clock = $('.timer');

  // initially set default timer variables
  var sessTime = 25;
  var sessBreak = 1;
  var setTime = 1;
  var setBreak = 1;

  /*
  MAIN POMODORO DRIVER
  */
  setPomodoro(sessTime, sessBreak, setTime, setBreak);

  /*
  TIMER SET FUNCTION
  */
  function setPomodoro(sessTime, sessBreak, setTime, setBreak) {

    duration = setTimers(sessTime);

    //  compute session time
    function setTimers() {
      var currentTime = new Date();
      var timerTime = new Date();
      return timerTime.setMinutes(currentTime.getMinutes() + sessTime);
    }

    /*
    TIMER EVENTS
    */

    $clock.countdown(duration, function (event) {
      $(this).
        html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));
    })  //finish
      .on('finish.countdown', function (event) {
        $.ionSound.play('bell_ring', { volume: 0.1, loop: 5 });
      })//stop
    // .on('stop.countdown', function (event) {
    //   $.ionSound.play('bell_ring', { volume: 0.1, loop: 5 });
    // })//update
      .on('update.countdown', function (event) {
        $.ionSound.play('snap', { volume: 0.25 });
      });

    /*
    TIMER CONTROLS
    */

    $('#timer-resume').click(function () {
      //resume timer
      //$clock.countdown('resume');

      resumeMin = new Date();

      var timedelta = resumeMin.getTime() - pauseMin.getTime();

      console.log(resumeMin.toString());
      $clock.countdown(timedelta.parseTime());

      $(this).addClass('disabled');
      $('#timer-pause').removeClass('disabled');
    });

    $('#timer-pause').click(function () {
      // pause timer
      $clock.countdown('pause');

      pauseMin = new Date();

      $(this).addClass('disabled');
      $('#timer-resume').removeClass('disabled');
    });

    $('#timer-reset').click(function () {

      // reset timer
      var duration = setTimers(sessTime);
      $clock.countdown(duration);

      $('#timer-resume').removeClass('disabled');
      $('#timer-resume').removeClass('active');
      $('#timer-pause').removeClass('disabled');
      $('#timer-pause').removeClass('active');
    });

  }

  /*
  PANEL CONTROLS
  */

  // call immediate function to close panels
  (function () {
    $('.panel')
      .find('.panel-body')
      .slideUp();

    $('.panel').children('.clickable')
      .addBack()
      .addClass('panel-collapsed');

    $('.panel').children('.clickable')
      .addBack()
      .find('i')
      .removeClass('glyphicon-chevron-up')
      .addClass('glyphicon-chevron-down');
  })();

  // setup click eventS for panels
  $(document).on('click', '.panel-heading, clickable', function (e) {

    var $this = $(this);

    if (!$this.hasClass('panel-collapsed')) {

      panelClosed();

    } else {

      panelOpen();

    }

    //close
    function panelClosed() {
      $this.parents('.panel')
        .find('.panel-body')
        .slideUp();

      $this.siblings('.clickable')
        .addBack()
        .addClass('panel-collapsed');

      $this.siblings('.clickable')
        .addBack()
        .find('i')
        .removeClass('glyphicon-chevron-up')
        .addClass('glyphicon-chevron-down');
    }

    //open
    function panelOpen() {
      $this.parents('.panel')
        .find('.panel-body')
        .slideDown();

      $this.siblings('.clickable')
        .addBack()
        .removeClass('panel-collapsed');

      $this.siblings('.clickable')
        .addBack()
        .find('i')
        .removeClass('glyphicon-chevron-down')
        .addClass('glyphicon-chevron-up');
    }
  });

});
