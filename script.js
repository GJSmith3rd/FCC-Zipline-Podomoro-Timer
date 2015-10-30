/* global $ */

$(document).ready(function() {

	//if mobile dev ide
	if (location.host === '10.0.0.75:3039') { 	
	
		$.getScript('live.js'); 	
		
		}

  // timer selector
  var $clock = $('.timer');

  // setup time pause variables
  var startTime;
  var resumeMin;
  var pauseMin;

  var timerMs;
  var breakMs;

  var timerMins = new Date();
  var breakMins = new Date();
  var setBreakMins = new Date();

  // initially set pomodoro variables
  var setUnits = 2;

  var sessUnits;
  var sessTime = 1;
  var sessCounter = 2;
  var sessBreakTime = 1;

  var setCounter = setUnits;
  var setBreakTime = 2;

  var displayTime = '';

  /*
  PRIMER
  */
  (function() {
    timerMins = convertValueToMinutes(sessTime);
    breakMins = convertValueToMinutes(sessTime + sessBreakTime);
    setBreakMins = convertValueToMinutes(sessTime + setBreakTime);
    $('.break').hide();
    if (sessTime < 10) {
      displayTime = '0' + sessTime;
    } else {
      displayTime = sessTime;
    }
    $('.timer').text(displayTime + ' min 00 sec');
    $('#sessText').text('Start Session');

    mainDriver();

  })();

  /*
  MAIN DRIVER
  */

  function mainDriver() {
    console.log('main driver' + setCounter + ':' + sessCounter);
    if ((setCounter > 0) && (sessCounter > 0)) {
      console.log('sets & sessions');
      //more sets available

      timerMins = convertValueToMinutes(sessTime);
      breakMins = convertValueToMinutes(sessTime + sessBreakTime);
      sessCounter -= 1;

      sessTimer(timerMins);

    } else if ((setCounter >(0) && (sessCounter === 0)) {
      console.log('sets & no sessions');
      //more sets but no sessions available

      sessCounter = 2;
      setCounter -= 1;

      //breakMins = convertValueToMinutes(setBreakTime);
      breakTimer(breakMins);

    } else if ((setCounter === 0) && (sessCounter > 0)) {
      console.log('no sets & no sessions');
      //no set or sessions available

      console.log('Set and Sessions Finished');

    }

  }

  /*
  POMODORO SETUP FUNCTION
  */

  function sessTimer(timerMins) {
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
        $('#sessText').text('Session Time');

      }) //finish
      .on('finish.countdown', function(event) {
        $.ionSound.play('bell_ring', {
          volume: 0.1,
          loop: 1

        });
        $('.timer').hide();
        $('.break').show();
        document.title = 'Timer ' +
          '0' +
          'm' +
          '0' +
          's';

        //breakTimer(breakMins, '.break');

        if (sessCounter === 0) {
          $('#sessText').text('Set Break');
          breakTimer(setBreakMins);

        } else {
          $('#sessText').text('Session Break');
          breakTimer(breakMins);
        }

      })
      //update
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

  function breakTimer(breakMins) {
    /*
    TIMER EVENTS
    */

    $('.break').countdown(breakMins, function(event) {

        $(this).
        html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));

      }) //finish
      .on('finish.countdown', function(event) {
        $.ionSound.play('bell_ring', {
          volume: 0.1,
          loop: 2
        });
        $('.timer').show();
        $('.break').hide();

        document.title = 'Timer ' +
          '0' +
          'm' +
          '0' +
          's';

        mainDriver();
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
