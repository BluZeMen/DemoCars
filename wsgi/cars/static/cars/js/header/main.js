define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	'./controller'
	], 
	function(mainApp, _, Marionette, views, controller) {
		mainApp.module("headerApp", function(header, mainApp, Backbone, Marionette, $, _){

			var headerView = new views.Header();

			mainApp.commands.setHandler("set:active:header", function(headerUrl){
				console.log("set:active:header", headerUrl);
				headerView.setActive(headerUrl);
			});

			header.on('start', function(){
				console.log('init header');
				mainApp.regions.header.show(headerView);
			});
		});

		return mainApp.headerApp;
	}
);