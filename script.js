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
  var breakMins = new Date();
  var breakMs;

  // initially set pomodoro variables
  var setUnits = 1;
  var sessTime = 9;
  var sessBreakTime = 1;
  var setBreakTime = 1;

  /*
  POMODORO CALL MAIN DRIVER
  */
  (function() {
    timerMins = convertValueToMinutes(sessTime);
    breakMins = convertValueToMinutes(sessTime + sessBreakTime);
    $('.break').hide();
    if (sessTime < 10) {
      var displayTime = '0' + sessTime
    }
    $('.timer').text(displayTime +  ' min 00 sec');
  })();

  //resetTimer();
  function resetTimer() {
    timerMins = convertValueToMinutes(sessTime);
    breakMins = convertValueToMinutes(sessTime + sessBreakTime);

    $('.break').hide();

    sessTimer(timerMins, '.timer');
    breakTimer(breakMins, '.break');
  }
  /*
  POMODORO SETUP FUNCTION
  */
  function sessTimer(timerMins, selector) {
    /*
    TIMER EVENTS
    */

    $(selector).countdown(timerMins, function(event) {

        $(this).
        html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));

      }) //finish
      .on('finish.countdown', function(event) {
        $.ionSound.play('bell_ring', {
          volume: 0.1,
          loop: 1
        });
        $('.timer').hide();
        $('.break').show();
        $('#sessText').text('Session Break');
        // document.title = 'Timer ' +
        //   '0' +
        //   'm' +
        //   '0' +
        //   's';
      })
      //stop
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

  }

  function breakTimer(breakMins, selector) {
    /*
    TIMER EVENTS
    */

    $(selector).countdown(breakMins, function(event) {

        $(this).
        html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));

      }) //finish
      .on('finish.countdown', function(event) {
        $.ionSound.play('computer_error', {
          volume: 0.1,
          loop: 3
        });
        $('#sessText').text('Session Over');
        document.title = 'Timer ' +
          '0' +
          'm' +
          '0' +
          's';
      })
      //stop
      // .on('stop.countdown', function (event) {
      //   $.ionSound.play('bell_ring', { volume: 0.1, loop: 5 });
      // })//update
      .on('update.countdown', function(event) {
        // $.ionSound.play('snap', {
        //   volume: 0.1
        // });

        document.title = 'Timer ' +
          event.offset.minutes +
          'm' +
          event.offset.seconds +
          's';
      });

  }

  /*
  TIMER CONTROLS
  */

  $('#timer-reset').click(function() {

    // reset timer
    //var duration = convertValueToMinutes(sessTime);
    //$clock.countdown(duration);
    resetTimer();
    $('#timer-resume').removeClass('disabled');
    $('#timer-resume').removeClass('active');
    $('#timer-pause').removeClass('disabled');
    $('#timer-pause').removeClass('active');
  });

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
  var soundLocation = 'http://cdn.mobilecreature.com/pomodoro/media/sounds/';

  $.ionSound({
    sounds: [{
      name: 'bell_ring'
    }, {
      name: 'snap'
    }, {
      name: 'computer_error'
    }],
    volume: 0.1,
    multiplay: false,
    path: soundLocation,
    preload: true
  });

});
