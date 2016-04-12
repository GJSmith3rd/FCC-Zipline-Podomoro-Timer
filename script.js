/* global $ */

$(document).ready(function() {

  // setup time pause variables
  var startTime;

  var timerTime = new Date();
  var timerMs;
  var breakTime = new Date();
  var breakMs;

  // updateially set pomodoro variables

  var sessionValue = 30;
  var sessionBreakValue = 5;
  var setBreakValue = 3;
  var setValue = 5;

  /*
  POMODORO CALL MAIN DRIVER
  */

  console.log(valueToTime(sessionValue).timeSecs);
  updateClock(valueToTime(sessionValue).timeSecs);


  //END DRIVER

  /*
  SUPPORT FUNCTIONS
  */

  var timeinterval = setInterval(updateClock, 1000, valueToTime(sessionValue).timeSecs);

  function updateClock(endtime) {
    console.log(endtime);
    var t = getTimeRemaining(endtime);
    var content = 'days: ' + t.days + '<br>' +
      'hours: ' + t.hours + '<br>' +
      'minutes: ' + t.mins + '<br>' +
      'seconds: ' + t.secs;
    $('#clockdiv').html(content);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  /*
  CONVERT VALUES TO ENDTIME
  */

  function valueToTime(num) {

    var secMs = (num * 1000);
    //console.log(secMs);
    var minMs = (num * 60 * 1000);
    //console.log(minMs);

    var timeSecs = new Date(Date.now() + secMs);
    //console.log(timeSecs);
    var timeMins = new Date(Date.now() + minMs);
    //console.log(timeMins);

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

  //resetTimer();
  function resetTimer() {

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

    $(this).addClass('disabled');
    $('#timer-pause').removeClass('disabled');
  });

  $('#timer-pause').click(function() {
    // pause timer

    $(this).addClass('disabled');
    $('#timer-resume').removeClass('disabled');
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
