define([
	'appMain',
	'underscore',
	'marionette',
	'./models',
	'./views',
	], 
	function(appMain, _, Marionette, models, views) {

		var model = new models.AboutUs();
		
		var viewOptions = {
			model : model
		};

		var viewAbout = new views.AboutUs(viewOptions);

		var updateAbout = function(onFetch){
			appMain.trigger("about:fetching", model);
			model.fetch({ success: onFetch });
			return viewAbout = new views.AboutUs(viewOptions);
		};

		updateAbout();

		console.log(viewAbout);

		var API = {

			view: function(){
				return viewAbout;
			},

			editPage: function(){
				console.log("edit about page");
				viewAbout.setEditable(true);
				//appMain.execute("set:active:header", "/car");
			},

			savePage: function(){
				console.log("edit about page");
				viewAbout.setEditable(false);
				//appMain.execute("set:active:header", "/car");
			},

			aboutUs: function(){
				updateAbout();
				appMain.regions.main.show(viewAbout);
			}

		};
		
		return API;
	}
);