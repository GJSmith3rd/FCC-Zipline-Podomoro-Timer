/* global $ */
$(document).ready(function() {

});

function getData() {

  // $.ajax({
  //   cache: true,
  //   type: 'POST',
  //   crossDomain: true,
  //   url: 'http://api.forismatic.com/api/1.0/',
  //   data: {
  //     method: 'getQuote',
  //     format: 'jsonp',
  //     lang: 'en'
  //   },
  //   dataType: 'jsonp',
  //   jsonp: 'jsonp',
  //   jsonpCallback: 'updateHTML'
  // });

}

function updateHTML(res) {

  // $('#quote').text(res.quoteText);
  // $('#author').text(res.quoteAuthor);
  // $('#link').attr('href', res.quoteLink);
  //
  // var combinedQuote = res.quoteAuthor + ' - ' + res.quoteText;
  //
  // if (combinedQuote.length > 140) {
  //
  //   $('#tweetDiv').empty();
  //
  // } else {
  //
  //   $('#tweetDiv').empty();
  //   var tweetA = '<a id="tweet" class="btn btn-default btn-xs btn-success" ';
  //   tweetA += 'href="https://twitter.com/intent/tweet?text=' + combinedQuote.replace(/ /g, '+');
  //   tweetA += '" target="_blank" class="col-xs-6" role="button">Tweet</a>';
  //   $('#tweetDiv').append(tweetA);
  //   $.getScript('https://platform.twitter.com/widgets.js');

  }

}
