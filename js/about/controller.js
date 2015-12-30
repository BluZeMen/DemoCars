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
			console.log(model.toJSON());
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
				model.fetch({ success: function(){
					appMain.vent.trigger('about:updated', model);
				}});
				console.log('fetched by req');
				return model;
			},

			show: function(){
				appMain.trigger("about:fetching", model);
				model.fetch({ success: function(){
					console.log('!!!!!!!!show about');
					appMain.vent.trigger('about:updated', model);
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
					model.save({
						success: function(){
							appMain.vent.trigger('about:updated', model);
						}				
					});
				}
				//appMain.execute("set:active:header", "/car");
			}

		};
	}
);