/* global $ */
//test
$(document).ready(function() {

  // timer selector
  var $clock = $('.timer');

  // setup time pause variables
  var startTime;
  var resumeMin;
  var pauseMin;
  var timerMins = new Date();
  var timerMs;

  // initially set pomodoro variables
  var setUnits = 3;
  var sessTime = 25;
  var sessBreakTime = 5;
  var setBreakTime = 15;

  /*
  POMODORO CALL MAIN DRIVER
  */

  timerMins = convertValueToMinutes(sessTime);
  timerMs = convertValueToMs(sessTime);
  setUpPomodoro(timerMins, timerMs);

  /*
  POMODORO SETUP FUNCTION
  */
  function setUpPomodoro(timerMins, timerMs) {
    /*
    TIMER EVENTS
    */

    $clock.countdown(timerMins, function(event) {

        $(this).
        html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));

      }) //finish
      .on('finish.countdown', function(event) {
        $.ionSound.play('bell_ring', {
          volume: 0.1,
          loop: 5
        });
      }) //stop
      // .on('stop.countdown', function (event) {
      //   $.ionSound.play('bell_ring', { volume: 0.1, loop: 5 });
      // })//update
      .on('update.countdown', function(event) {
        $.ionSound.play('snap', {
          volume: 0.1
        });
        document.title = 'Timer ' +
        event.offset.minutes +
        'm' +
        event.offset.seconds +
        's';
      });

    /*
    TIMER CONTROLS
    */

    $('#timer-resume').click(function() {
      //resume timer
      $clock.countdown('resume');

      $(this).addClass('disabled');
      $('#timer-pause').removeClass('disabled');
    });

    $('#timer-pause').click(function() {
      // pause timer
      $clock.countdown('pause');

      pauseMin = new Date();

      $(this).addClass('disabled');
      $('#timer-resume').removeClass('disabled');
    });

    $('#timer-reset').click(function() {

      // reset timer
      var duration = convertValueToMinutes(sessTime);
      $clock.countdown(duration);

      $('#timer-resume').removeClass('disabled');
      $('#timer-resume').removeClass('active');
      $('#timer-pause').removeClass('disabled');
      $('#timer-pause').removeClass('active');
    });

  }

  /*
  CONVERT VALUES TO MINUTES
  */
  function convertValueToMinutes(timerValue) {

    startTime = new Date();
    var currentTime = startTime;
    var timerTime = startTime;

    return timerTime.setMinutes(currentTime.getMinutes() + timerValue);
  }

  /*
  CONVERT VALUES TO MS
  */
  function convertValueToMs(timerValue) {
    timerMs = timerValue * 60 * 1000;
    return timerMs;
  }

  /*
  PANEL CONTROLS
  */

  // call immediate function to close panels
  (function() {
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
  $(document).on('click', '.panel-heading, clickable', function(e) {

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

  /*
  SET IONSOUND CONFIG
  */
  var soundLocation = 'https://7b313a9f7606490ebe3c2c7d078512212b272396.googledrive.com/';
  soundLocation += 'host/0BxHL3kJgWo5eT1NpOW8zbzB0SzQ/sounds/';

  $.ionSound({    sounds: [{
      name: 'bell_ring'
    }, {
      name: 'snap'
    }],
    volume: 0.1,
    multiplay: true,
    path: soundLocation,
    preload: true
  });

});
