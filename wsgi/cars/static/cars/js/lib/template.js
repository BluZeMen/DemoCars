define([
	'underscore',
	'jquery'
	], 
	function(_, $) {

		var template = function(templateName){
			//var text = require('text!' + url);
			var text = $.ajax({ type: "GET", url: templateName, async: false }).responseText; //No need to append  

			return _.template(text);
		};

		return template;
});