define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	'./controller'
	], 
	function(appMain, _, Marionette, views, controller) {
		appMain.module("appHeader", function(header, appMain){

			appMain.commands.setHandler("set:active:header", function(headerUrl){
				console.log("set:active:header", headerUrl);
				controller.setActive(headerUrl);
			});

			appMain.vent.bind('about:updated', controller.setAbout);

			header.on('start', function(){
				console.log('init header');
				appMain.vent.trigger('require:about:update');
				controller.show();
			});
		});

		return appMain.appHeader;
	}
);