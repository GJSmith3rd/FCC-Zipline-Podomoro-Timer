/* global $ */

$(document).ready(function() {

  // setup time pause variables
  var startTime;

  var timerTime = new Date();
  var timerMs;
  var breakTime = new Date();
  var breakMs;

  // update pomodoro variables
  var defaultValue = 15;
  var sessionValue = 15;
  var sessionBreakValue = 5;
  var setBreakValue = 3;
  var setValue = 5;

  /*
  POMODORO CALL MAIN DRIVER
  */
  $('.minutes').text(('0' + sessionValue).slice(-2));
  $('.seconds').text('00');
  //END DRIVER

  /*
  SUPPORT FUNCTIONS
  */

  /*
  CONVERT VALUES TO ENDTIME
  */

  function valueToTime(num) {

    var secMs = (num * 1000);
    var minMs = (num * 60 * 1000);

    var timeSecs = new Date(Date.now() + secMs);
    var timeMins = new Date(Date.now() + minMs);

    return {
      timeDate: new Date(Date.now()),
      timeSecs: timeSecs,
      timeMins: timeMins

    };

  }

  /*
  CONVERT TIME TO MILLISECONDS
  */

  function getTimeRemaining(endtime) {

    var t = Date.parse(endtime) - Date.parse(new Date());
    var secs = Math.floor((t / 1000) % 60);
    var mins = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'mins': mins,
      'secs': secs
    };

  }

  function clearTimers() {
    for (var j = 1; j < 99999; j++) {
      window.clearInterval(j);
    }
  }

  function initDisplay() {
    $('.minutes').text(('0' + sessionValue).slice(-2));
    $('.seconds').text('00');
    $('#sessText').text('Start Session');
  }

  //resetTimer();
  function resetTimer() {
    console.log('resetTimer');

    clearTimers();
    initDisplay();
    startTimers();

    function startTimers() {
      console.log('startTimers');
      initDisplay();
      $('#sessText').text('Session In Progress');
      $.ionSound.play('start');

      //sessions
      var sessionInterval =
        setInterval(updateSessionClock, 1000, valueToTime(sessionValue).timeMins);

      function updateSessionClock(endtime) {
        var t = getTimeRemaining(endtime);

        $('.minutes').text(('0' + t.mins).slice(-2));
        $('.seconds').text(('0' + t.secs).slice(-2));
        $.ionSound.play('snap');

        if (t.total <= 0) {
          clearInterval(sessionInterval);
          $.ionSound.play('finish');
          initDisplay();
        }
      }

    }

    console.log('END resetTimer');
  }

  /*
  POMODORO SETUP FUNCTION
  */
  function sessTimer(timerSecs, selector) {
    /*
    TIMER EVENTS
    */

  }

  function breakTimer(breakMins, selector) {
    /*
    TIMER EVENTS
    */

  }

  /*
  TIMER CONTROLS
  */

  $('#timer-minus').click(function() {
    switch (true) {
      case sessionValue < 2:
        $(this).removeClass('enabled');
        $(this).addClass('disabled');
        $('#timer-plus').removeClass('disabled');
        $('#timer-plus').addClass('enabled');
        break;
      default:
        if ($('#timer-plus').hasClass('disabled') === true) {
          $('#timer-plus').removeClass('disabled');
          $('#timer-plus').addClass('enabled');
        }
        clearTimers();
        sessionValue -= 1;
        initDisplay();
        break;
    }
  });

  $('#timer-plus').click(function() {
    switch (true) {
      case sessionValue > 24:
        $(this).removeClass('enabled');
        $(this).addClass('disabled');
        $('#timer-minus').removeClass('disabled');
        $('#timer-minus').addClass('enabled');
        break;
      default:
        if ($('#timer-minus').hasClass('disabled') === true) {
          $('#timer-minus').removeClass('disabled');
          $('#timer-minus').addClass('enabled');
        }
        clearTimers();
        sessionValue += 1;
        initDisplay();
        break;
    }
  });

  $('#timer-reset').click(function() {

    resetTimer();
    $('#timer-minus').removeClass('disabled');
    $('#timer-minus').addClass('enabled');
    $('#timer-plus').removeClass('disabled');
    $('#timer-plus').addClass('enabled');
  });

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
  var soundLocation = 'http://mobilecreature-cdn.appspot.com/pomodoro/media/sounds/';

  $.ionSound({
    sounds: [
      { name: 'bell_ring', alias: 'start' },
      { name: 'bell_ring', loop: 3, alias: 'finish' },
      { name: 'snap' },
      { name: 'computer_error' }
    ],
    volume: 0.1,
    multiplay: true,
    path: soundLocation,
    preload: true
  });

});
