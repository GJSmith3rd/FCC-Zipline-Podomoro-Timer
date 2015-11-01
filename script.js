/* global $ */

// timer selector
var $clock = $('.timer');

// setup time pause variables
var displayTime;

var startTime;
var resumeMin;
var pauseMin;

var timerMins = new Date();
var breakMins = new Date();
var setBreakMins = new Date();

var breakTimerMins = new Date();

// initially set pomodoro variables
var setUnits = 2;
var setCounter = setUnits;

var sessUnits = 4;
var sessCounter = sessUnits;

var sessTime = 20;
var sessBreakTime = 20;
var setBreakTime = 20;

$(document).ready(function() {

  /*
  MAIN DRIVER
  */

  function mainDriver() {
    console.log('Main Driver');

    if ((setCounter > 0) && (sessCounter > 0)) {
      console.log(setCounter + ' more sets & ' + sessCounter + ' more sessions');
      //more sets and more sessions available

      $('#sessText').text('Sets ' + setCounter + ' Sessions ' + sessCounter);
      console.log('calling Session Timer');

      sessCounter -= 1;

      timerMins = convertValueToMinutes(sessTime);
      breakTimerMins = convertValueToMinutes(sessBreakTime);
      sessTimer(timerMins, breakTimerMins);

    } else if ((setCounter > 0) && (sessCounter === 0)) {
      console.log(setCounter + ' more sets & ' + sessCounter + ' more sessions');
      //more sets but no sessions available

      $('#sessText').text('Session Break');
      console.log('calling Break Timer');

      sessCounter = sessUnits;
      setCounter -= 1;

      breakMins = convertValueToMinutes(setBreakTime);
      breakTimer(breakTimerMins);

      // } else if ((setCounter >= 1) && (sessCounter === 0)) {
      //   //no sets but more sessions available
      //   console.log(setCounter + ' more sets & ' + sessCounter + ' more sessions');
      //
      //   sessCounter = sessUnits;
      //
      //   $('#sessText').text('Session Break');
      //   console.log('calling Break Timer');
      //
      //   setCounter -= 1;
      //
      //   timerMins = convertValueToMinutes(setBreakTime);
      //   breakTimer(timerMins);
      //
      //  } else if ((setCounter === 1) && (sessCounter === 0)) {
      //   //(setCounter === 0 && sessCounter === 0))
      //   //no sets and no more sessions available
      //   console.log(setCounter + ' more sets & ' + sessCounter + ' more sessions');
      //
      //   sessCounter = sessUnits;
      //
      //   $('#sessText').text('Sets ' + setCounter + ' Sessions ' + sessCounter);
      //
    } else if (setCounter === 0) {
      //(setCounter === 0 && sessCounter === 0))
      //no sets and no more sessions available
      console.log(setCounter + ' more sets & ' + sessCounter + ' more sessions');

      $('#sessText').text('Pomodoro Over');

    }

  }.deb()

  /*
  POMODORO SETUP FUNCTION
  */

  function sessTimer(timerMins, breakTimerMins) {
    console.log('Session Timer');

    /*
    TIMER EVENTS
    */
    $.ionSound.play('bell_ring', {
      volume: 0.1,
      loop: 1

    });
    $('.timer').countdown(timerMins, function(event) {

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

        console.log('calling break driver');
        breakTimer(breakTimerMins);

      })
      //update
      .on('update.countdown', function(event) {
        $.ionSound.play('snap', {
          volume: 0.1
        });
        $('.break').hide();
        $('.timer').show();
        document.title = 'Session ' +
          event.offset.minutes +
          'm' +
          event.offset.seconds +
          's';
      });

  }

  function breakTimer(breakTimerMins) {
    console.log('Break Timer');
    /*
    TIMER EVENTS
    */

    $('.break').countdown(25, function(event) {

        $(this).
        html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));

      }) //finish
      .on('finish.countdown', function(event) {
        $.ionSound.play('bell_ring', {
          volume: 0.1,
          loop: 3
        });
        $('.timer').show();
        $('.break').hide();

        console.log('calling main driver');
        mainDriver();
      })
      .on('update.countdown', function(event) {
        document.title = 'Timer ' +
          event.offset.minutes +
          'm' +
          event.offset.seconds +
          's';
      });

  }

  //resetTimer();
  function resetTimer() {
    timerMins = convertValueToMinutes(sessTime);
    breakMins = convertValueToMinutes(sessTime + sessBreakTime);

    $('.break').hide();
    $('#sessText').text('Session Time');

    sessTimer(timerMins, '.timer');
    //breakTimer(breakMins, '.break');
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

    return timerTime.setSeconds(currentTime.getSeconds() + timerValue);
  }

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
  (function() {
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
  })();

  /*
  PRIMER
  */
  (function() {

    $('.break').hide();
    if (sessTime < 10) {
      displayTime = '0' + sessTime;
    } else {
      displayTime = sessTime;
    }
    $('.timer').text(displayTime + ' min 00 sec');
    $('#sessText').text('Pomodoro Start');

    mainDriver();

  })();

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

  /*
  DEVELOPMENT SETUP
  */
  (function() {
    if (location.host === '10.0.0.75:3039') {

      //use live.js if mobile dev ide
      $.getScript('live.js');

      //use less browser scripts if mobile dev ide and
      //async add scripts and links to dom head dynamically
      $('head script')
        .last()
        .append('<link rel="stylesheet/less"' +
          ' type="text/css" href="styles.less" />');
      $('head script')
        .last()
        .append('<script async=false >less = {env: "development", ' +
          'async: false, fileAsync: false, poll: 1000, functions: {},' +
          ' dumpLineNumbers: "comments",' +
          ' relativeUrls: false}; </script>');
      $('head script')
        .last()
        .append('<script async=false src="less.min.js" type="text/javascript"></script>');
      $('head script')
        .last()
        .append('<script async=false>less.watch();</script>');

    } else {
      //use local css generated by gulp tasks
      $('head script')
        .last()
        .append('<link async="false" rel="stylesheet" href="styles.css" />');

    }

  })();

});
