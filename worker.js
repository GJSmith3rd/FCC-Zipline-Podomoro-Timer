// inside worker.js
var totalTimeLimit = 0;
var timerVar = null;
var timerStart = true;

function timer(d0) {

  // get current time
  var d = (new Date()).valueOf();
  
  // calculate time difference between now and initial time
  var diff = d - d0;
  
  // calculate number of minutes
  var minutes = Math.floor(diff / 1000 / 60);
  
  // calculate number of seconds
  var seconds = Math.floor(diff / 1000) - minutes * 60;
  
  // check if you have crossed the timer limit
  if (parseInt(minutes) >= parseInt(totalTimeLimit)) {
  
    // very important, to clear the timeout, else the threads keep
    // on running, and eventually you are going to crash the browser
    clearTimeout(timerVar);
    self.postMessage('-1');
    
  } else {
  
    // if number of minutes less than 10, add a leading '0'
    minutes = minutes.toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    
    // if number of seconds less than 10, add a leading '0'
    seconds = seconds.toString();
    if (seconds.length === 1) {
    
      seconds = '0' + seconds;
      
    }
    
    self.postMessage(minutes + ':' + seconds);
  }
}

self.addEventListener('message', function(e) {

  var arr = e.data.split(':');
  // you can use message to send different options
  
  if (arr.length > 1) {
  
    if (arr[0] === 'timer') {
    
      if (timerStart) {
      
        totalTimeLimit = arr[1];
        
        // get current time
        var startTime = (new Date()).valueOf();
        
        timerVar = setInterval(function() {
        
          timer(startTime);
          
        }, 1000);
        
        timerStart = false;
      }
      
    } else if (arr[0] === 'option2') {
      // split it according what you want
      var ids = arr[1].split(',');
      var xmlhttp = new XMLHttpRequest();
      //            if (ids[2].XMLHttpRequest)
      //            {
      //                // code for IE7+, Firefox, Chrome, Opera, Safari
      //                xmlhttp=new XMLHttpRequest();
      //            }
      //            else
      //            {
      //                // code for IE6, IE5
      //                xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
      //            }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          
          // send success message
          console.log('');
        }
      };
      
      var params = '';
      
      // ideally use xmlHttp, since $ will give you undefined, unless passed through from
      // the parent thread
      
      xmlhttp.open('POST', 'http://localhost/data.json', true);
      xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xmlhttp.setRequestHeader('Content-length', params.length);
      xmlhttp.setRequestHeader('Connection', 'close');
      xmlhttp.send(params);

    }
  }
}, false);
