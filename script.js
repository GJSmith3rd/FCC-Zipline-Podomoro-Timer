/* global $ */

$(document).ready(function () {

  // timer default setup
  var sessionValue = 25;
  var sessionBreakValue = 5;
  var setValue = 4;

  // timer preset sessions
  var shortS = 10;
  var mediumS = 20;
  var standardS = 25;
  var longS = 50;

  // timer preset breaks
  var shortB = 3;
  var mediumB = 4;
  var standardB = 5;
  var longB = 10;

  // breakTime indicator for bell_ring
  var breakTime = false;

  // sounds
  var snapSound = 'snap';
  var startSound = 'start';
  var finishSound = 'finish';

  // first timer setup
  initDisplay();

  /*
  jQuery PANEL CONTROLS (immediate function)
  */

  // jQuery Immediate function to close panels
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

  /*
  jQuery INIT DISPLAY
  */
  function initDisplay() {
    $('.minutes').text(('0' + sessionValue).slice(-2));
    $('.seconds').text(('00').slice(-2));
    $('#sessText').text('Start Session');

    document.title = 'Pomodoro Timer';
  }

  /*
  jQuery REFRESH DISPLAY
  */
  function refreshDisplay() {
    $('.minutes').text(('0' + sessionValue).slice(-2));
    $('.seconds').text(('00').slice(-2));
  }

  /*
  jQuery UPDATE DISPLAY
  */
  function updateDisplay(mins, secs, message) {
    $('.minutes').text(('0' + mins).slice(-2));
    $('.seconds').text(('0' + secs).slice(-2));
    $('#sessText').text(message);
  }

  /*
    jQuery UPDATE TITLE
    */
  function updateTitle(mins, secs, message) {

    document.title = message +
      ' ' +
      ('0' + mins).slice(-2) +
      ':' +
      ('0' + secs).slice(-2);
  }

  /*
  CLEAR TIMERS
  */
  function clearTimers() {
    for (var j = 1; j < 999; j++) {
      window.clearInterval(j);
    }
    for (var k = 1; k < 999; k++) {
      window.clearTimeout(k);
    }
  }

  /*
  MAIN TIMER START/RESTART
  */

  //resetTimer();
  function resetTimer() {

    clearTimers();
    initDisplay();
    $.ionSound.play(startSound);
    breakTime = false;

    var currentSet = 0;

    for (var i = 0; i < setValue; i++) {

      //top of loop (number of sets)

      // top of setInterval (length of session)
      setTimeout((function (iVal) {

        return function () {

          currentSet += 1;

          //top setInterval (timer update - 1sec)

          /*
          FOR PRODUCTION USE IN MINUTES
          */
          var sessionInterval =
            setInterval(updateSessionClock, 1000,
              valueToTime(sessionValue).timeMins,
              valueToTime(sessionValue + sessionBreakValue).timeMins);

          /*
          FOR TESTING AND DEBUGGING USE IN SECONDS
          */
          // var sessionInterval =
          //   setInterval(updateSessionClock, 1000,
          //     valueToTime(sessionValue).timeSecs,
          //     valueToTime(sessionValue + sessionBreakValue).timeSecs);

          function updateSessionClock(sTime, bTime) {
            var t = getTimeRemaining(sTime);
            var b = getTimeRemaining(bTime);

            switch (true) {
              case t.total <= 0 && iVal === setValue - 1:
                clearInterval(sessionInterval);
                initDisplay();
                $.ionSound.play(finishSound);
                break;
              case t.total <= 0 && breakTime:
                updateDisplay(b.mins, b.secs, 'Break: ' + currentSet);
                updateTitle(b.mins, b.secs, 'Break');
                $.ionSound.play(startSound);
                breakTime = false;
                break;
              case t.total <= 0 && b.total > 1:
                updateDisplay(b.mins, b.secs, 'Break: ' + currentSet);
                updateTitle(b.mins, b.secs, 'Break');
                $.ionSound.play(snapSound);
                break;
              case t.total > 0:
                updateDisplay(t.mins, t.secs, 'Session: ' + currentSet);
                updateTitle(t.mins, t.secs, 'Session');
                $.ionSound.play(snapSound);
                breakTime = true;
                break;
              case t.total <= 0:
                clearInterval(sessionInterval);
                updateDisplay('00', '00' + sessionValue, 'Session: ' + currentSet);
                updateTitle('00', '00', 'Session');
                $.ionSound.play(startSound);
                refreshDisplay();
                break;
            }

          }
          //bottom of setInterval (update timer - 1sec)

        };

        /*
        FOR PRODUCTION USE IN MINUTES
        */
      })(i), (sessionValue + sessionBreakValue) * i * 1000 * 60);

      /*
      FOR TESTING AND DEBUGGING USE IN SECS
      */
      // })(i), (sessionValue + sessionBreakValue) * i * 1000)        ;
      //bottom of setTimeout (length of session)

    }
    //bottom of loop (number of sets)

  }
  //end function resetTimer()

  /*
  jQuery START/RESTART TIMER
  */
  $('#timer-startReset').click(function () {
    $('#timer-minus').removeClass('disabled');
    $('#timer-minus').addClass('enabled');
    $('#timer-plus').removeClass('disabled');
    $('#timer-plus').addClass('enabled');
    resetTimer();
  });

  /*
  jQuery TIMER CONTROLS
  */
  $('#timer-minus').click(function () {
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

  $('#timer-plus').click(function () {
    switch (true) {
      case sessionValue > 49:
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

  /*
jQuery PRESETS CONTROLS
*/
  $('.short, .medium, .standard, .long').click(function (e) {
    var $this = $(this);
    switch (true) {
      case $this.hasClass('short'):
        sessionValue = shortS;
        sessionBreakValue = shortB;
        break;
      case $this.hasClass('medium'):
        sessionValue = mediumS;
        sessionBreakValue = mediumB;
        break;
      case $this.hasClass('standard'):
        sessionValue = standardS;
        sessionBreakValue = standardB;
        break;
      case $this.hasClass('long'):
        sessionValue = longS;
        sessionBreakValue = longB;
        break;
    }

    clearTimers();
    initDisplay();

  });

  // jQuery PANEL CHEVRONS
  $('.main-panel').click(function (e) {
    var $this = $(this);
    switch (true) {
      case !$this.hasClass('panel-collapsed'):
        panelClosed();
        break;
      default:
        panelOpen();
        break;
    }

    //close panel
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

    //open panel
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
  jQuery SOUND CONTROLS
  */
  $('#sound-off').click(function () {
    snapSound = 'null';
    startSound = 'null';
    finishSound = 'null';
    $(this).blur();
    $(this).removeClass('active');
  });

  $('#sound-on').click(function () {
    snapSound = 'snap';
    startSound = 'start';
    finishSound = 'finish';
    $(this).blur();
    $(this).removeClass('active');
  });

  /*
  IONSOUND CONFIG
  */
  var soundLocation = 'http://mobilecreature-cdn.appspot.com/pomodoro/media/sounds/';

  $.ionSound({
    sounds: [
      { name: '', alias: 'null' },
      { name: 'bell_ring', alias: 'start' },
      { name: 'bell_ring', loop: 3, alias: 'finish' },
      { name: 'snap' }
    ],
    volume: 0.1,
    multiplay: true,
    path: soundLocation,
    preload: true
  });

  /*
  CONVERT VALUES TO TIME
  */
  // minutes for timer (timeMins)
  // seconds for testing and debugging (timeSecs)
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

});
