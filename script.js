/* global $ */

// $(document).ready(function() {
//
// });

// var worker = null;
//
// function createWorkers() {
//   if (worker === null) {
//     // this needs to be in a different file
//     // worker always has to have a separate file
//     worker = new Worker('worker.js');
//   }
//   // add a listener here. this is needed, if you receive any data from the worker thread, you can handle it here
//   worker.addEventListener('message', function(e) {
//     // I am using -1 to indicate that the timer has finished, you can  use anything you want.
//     if (parseInt(e.data) === -1) {
//       alert('Your time is finished');
//       // exit the thread
//       $('#polling').trigger('click');
//     } else {
//       // update your timer text here. This is used to display the countdown timer
//       $('#timer span').text(e.data);
//     }
//   }, false);
// }

  // $(document).on('click', '#startTimer', function() {
  //   // create the workers here
  //   createWorkers();
  //   $.ajax({
  //     url: '',
  //     type: 'GET',
  //     data: getData,
  //     success: function(data, textStatus, jqXHR) {
  //       if (data.data) {
  //         // convert minutes into proper format
  //         var min = $('#timer').val() + ':00';
  //         var totalTime = $('#timer').val();
  //         // send a message
  //         worker.postMessage('timer:' + totalTime);
  //       }
  //     }
  //   });
//});
