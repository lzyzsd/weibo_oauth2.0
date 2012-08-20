
/*
 * GET home page.
 */
var url = require('url');
var querystring = require('querystring');
var request = require('request');

var redirect_uri = querystring.escape("http://127.0.0.1:3000/token");
var appkey = "your appkey";
var authorize_uri = "https://api.weibo.com/oauth2/authorize?response_type=code&redirect_uri="
	+redirect_uri
	+"&client_id="
	+appkey;
var secret = "your secret";
var token_uri = "https://api.weibo.com/oauth2/access_token?client_id="+appkey+"&client_secret="+secret+"&grant_type=authorization_code&redirect_uri="+redirect_uri+"&code=";

exports.index = function(req, res){
  res.render('index', { title: 'Express', authorize_uri: authorize_uri });
};

exports.token = function(req, res){
	query = url.parse(req.url, true).query;
	
	if(query['code']){
		var uri = token_uri + query.code;
		request.post(uri, function(err, response, body){
			if (!err && response.statusCode == 200) {
			    console.log(body); // Print the google web page.
			    body = JSON.parse(body);
			    console.log(body);
			    var result = { 
				access_token: body.access_token,
				remind_in: body.remind_in,
				expires_in: body.expires_in
				};
				res.render('success', { title: 'Success', result: result });
			}else {
				console.log('error accessing ' + err);
			}
		});
	}
};

exports.success = function(req, res){
	var result = { 
		access_token: req.body.access_token,
		remind_in: req.body.remind_in,
		expires_in: req.body.expires_in
		};
	res.render('success', { title: 'Success', result: result });
};