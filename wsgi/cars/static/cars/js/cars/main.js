define([
	'appMain',
	'underscore',
	'marionette',
	'./collections',
	'./views',
	'./controller'
	],

	function(appMain, _, Marionette, collections, views, controller) {

		var Router =  Marionette.AppRouter.extend({
			appRoutes: {
				'(/filter/criterion::criterion)' : 'listCars',
				'car/create': 'createCar',
				'car/:id': 'showCar',
				'car/:id/edit': 'editCar',
				'car/:id/delete': 'deleteCar',
			}
		});

		appMain.on("before:start", function(){
			console.log('init cars');

			appMain.regions.main.on("show", function(view, region, options){
				//view.bind('childview:car:list', controller.listCars);
				view.on('childview:car:show', function(e){
					controller.showCar(e.model.id);
					appMain.navigate('/car/'+e.model.id);
				});
				view.on('childview:car:edit', function(e){
					controller.editCar(e.model.id);
					appMain.navigate('/car/'+e.model.id+'/edit');
				});
				view.on('car:edit', function(e){
					controller.editCar(e.model.id);
					appMain.navigate('/car/'+e.model.id+'/edit');
				});
				view.on('childview:car:delete', function(e){
					console.log('delete', e);
					controller.deleteCar(e.model.id);
				});
				view.on('car:delete', function(e){
					console.log('delete', e);
					controller.deleteCar(e.model.id);
				});
				view.on('car:save', controller.saveCar);
				view.on('car:load:image', controller.loadImage);
			});

			
			new Router({
				controller: controller
			});

		});

		return Router;

	}
);