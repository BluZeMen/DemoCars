define([
	'appMain',
	'./main',
	'underscore',
	'marionette',
	'./models',
	'./views',
	'./main'
	], 
	function(appMain, aboutApp, _, Marionette, models, views, aboutApp) {

		var view, model = new models.AboutUs();

		return {

			fetchAbout: function(){
				model.fetch();
				console.log('fetched by req');
			},

			show: function(){
				appMain.trigger("about:fetching", model);
				model.fetch({ success: function(){
					view = new views.AboutUs({ model: model});
					appMain.regions.main.show(view);
				}});
				appMain.execute("set:active:header", "/about-us");
			},

			editPage: function(){
				//console.log("edit about page");
				if(view){
					view.setEditable(true);
				}
				//appMain.execute("set:active:header", "/car");
			},

			savePage: function(){
				//console.log("edit about page");
				if(view){
					view.setEditable(false);
					model.set('body', view.getBody());
					model.save();
				}
				//appMain.execute("set:active:header", "/car");
			}

		};
	}
);