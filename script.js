/* global $ */

$(document).ready(function () {

  var $clock = $('.timer');

  var sessTime = 3;
  var sessBreak = 2;
  var setTime = 1;
  var setBreak = 2;

  //invoke pomodor timer bases on variables

  setPomodoro(sessTime, sessBreak, setTime, setBreak);

  function setPomodoro(sessTime, sessBreak, setTime, setBreak) {

    setClock(setTime);

    /*calculate sessions and breaks
      and set clock
    */
    function setClock(clockTime) {

      // set timer variables

      var currentTime = new Date();
      var timerTime = new Date();

      //  compute session time
      timerTime.setMinutes(currentTime.getMinutes() + clockTime);

      $($clock).countdown(timerTime)
        .on('update.countdown', function (event) {
          $(this).html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));
        })

        .on('finish.countdown', function (event) {
          $(this).html(event.strftime('<span>%M</span> min ' + '<span>%S</span> sec'));
        });

      // .on('stop.countdown', function (event) {

      // });

      $('#timer-resume').addClass('disabled');

    }

    function setTimers() {
      var d1 = new Date();
      var d2 = new Date();
      return d2.setMinutes(d1.getMinutes() + sessTime);
    }

    $('#timer-reset').click(function () {
      $clock.countdown(setTimers());
      $('#timer-resume').removeClass('disabled');
      $('#timer-resume').removeClass('active');
      $('#timer-pause').removeClass('disabled');
      $('#timer-pause').removeClass('active');
    });

    $('#timer-pause').click(function () {
      $clock.countdown('pause');
      $(this).addClass('disabled');
      $('#timer-resume').removeClass('disabled');
    });

    $('#timer-resume').click(function () {
      $clock.countdown('resume');
      $(this).addClass('disabled');
      $('#timer-pause').removeClass('disabled');
    });
  }
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

  // setup click event for panels
  $(document).on('click', '.panel-heading, clickable', function (e) {

    var $this = $(this);

    if (!$this.hasClass('panel-collapsed')) {

      panelClosed();

    } else {

      panelOpen();

    }

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
