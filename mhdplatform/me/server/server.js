"use strict";

/**
 * create hd Server
 */

var app   = require('./app');
var start = Date.now();
var log   = function(message) {
  console.log("[" + (Date.now() - start) + "] " + message);
};

log("Begin server.js");

module.exports = app.listen(app.get('port'), function() {
	log("Express server listening on port " + app.get('port'));
});

log("End server.js");
