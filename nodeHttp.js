//load file in node shell:::::: .load ./nodeHttp.js
//request JSON callback:::::: http.request(authentication_options, callback).end();
//global variable to capture response from http request
var http = require('https');
var res ;
var app_id = '399575120226034';
var secret = '64001edce7887cab6578136f0dae3e06';
var redirect = 'localhost:3000'
//random comment to push to git

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var graph_options = {
  host: 'graph.facebook.com',
  path: '/37602228/accounts'
};

var authentication_options = {
  host: 'graph.facebook.com',
  path: '/oauth/access_token?client_id=' + app_id + '&client_secret=' + secret + '&grant_type=client_credentials'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    res = str;
    // res = JSON.parse(str);
    return(res);
  });
}

// takes the string returned by getting facebook access token and returns only the access code needed
getToken = function(access_token) {
  var token = '';
  var tokenStart = string.indexOf("=");
  token = token + string.substring(tokenStart + 1, access_token.length)
  return(token)
}

