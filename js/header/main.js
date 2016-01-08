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
				controller.setActive(headerUrl);
			});

			appMain.vent.bind('about:updated', controller.setAbout);

			header.on('start', function(){
				var about = appMain.reqres.request('require:about:update');
				controller.show();
				controller.setAbout(about);
			});
		});

		return appMain.appHeader;
	}
);