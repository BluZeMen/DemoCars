define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	'./controller'
	], 
	function(appMain, _, Marionette, views, controller) {
		appMain.module("aboutApp", function(about, appMain){
			var Router =  Marionette.AppRouter.extend({
				appRoutes: {
					'about-us' : 'aboutUs'
				}
			});

			appMain.on('about:edit', function(){
				controller.editPage();
				console.log('controller.editPage();');
			});

			appMain.on('about:save', function(){
				controller.savePage();
				console.log('controller.savePage();');
			});

			about.on('start', function(){
				new Router({
					controller: controller
				});
				console.log('init about');
			});
		});

		return appMain.aboutApp;
	}
);