/* global $ */

$(document).ready(function () {

  var $clock = $('.timer');
  var currentTime = new Date();
  var timerTime = new Date();

  var sess = 25;

  timerTime.setMinutes(currentTime.getMinutes() + sess);

  defaultTimer();

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

  function defaultTimer() {

    $($clock).countdown(timerTime, function (event) {
      $('#timer-resume').addClass('disabled');
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

});
