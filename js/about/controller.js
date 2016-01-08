define([
	'appMain',
	'./main',
	'underscore',
	'marionette',
	'./models',
	'./views',
	'./main',
	'dialog',
	], 
	function(appMain, aboutApp, _, Marionette, models, views, aboutApp) {

		// i used a single entry for AboutPage data
		var view, model = new models.AboutUs({id: 1});

		// initializing "about us" in storage 
		model.fetch({error: function(model, error) {
			model.save();
		}});

		// handling validation errors
		model.on('invalid', function(model, error){
			appMain.vent.trigger('dialog:show:alert',{
				title: 'Error',
				body: error
			});
		});


		return {

			fetchAbout: function(){
				model.fetch();
				return model;
			},

			show: function(){
				model.fetch({ success: function(){
					view = new views.AboutUs({ model: model});
					appMain.regions.main.show(view);
				}});
				appMain.execute("set:active:header", "/about-us");
			},

			editPage: function(){
				if(view){
					view.setEditable(true);
				}
			},

			savePage: function(){
				if(view){
					view.setEditable(false);
					model.set('body', view.getBody());
					model.save();
				}
			}

		};
	}
);