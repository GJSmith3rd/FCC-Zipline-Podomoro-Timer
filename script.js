/* global $ */

$(document).ready(function () {

  var d1 = new Date();
  var d2 = new Date();

  d2.setMinutes(d1.getMinutes() + 25);

  console.log(d1);
  console.log(d2);

  //'2016/01/01'

  $('.timer').countdown(d2, function (event) {
    // $(this).text(event.strftime('%D days %H:%M:%S')
    //   );
    $(this).text(event.strftime('%M:%S')
      );
  });

});
