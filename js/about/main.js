define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	'./controller'
	], 
	function(appMain, _, Marionette, views, controller) {
		appMain.module("appAbout", function(about, appMain){
			var Router =  Marionette.AppRouter.extend({
				appRoutes: {
					'about-us' : 'show'
				}
			});

			appMain.reqres.setHandler('require:about:update', controller.fetchAbout);
			
			about.on('start', function(){
				appMain.regions.main.on("show", function(view, region, options){
				  	view.bind('about:edit', controller.editPage);
					view.bind('about:save', controller.savePage);
				});

				new Router({
					controller: controller
				});
				console.log('init about');
			});
		});

		return appMain.appAbout;
	}
);