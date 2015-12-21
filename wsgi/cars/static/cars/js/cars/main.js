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
				'car/:id': 'showCar',
				'car/:id/edit': 'editCar',
				'car/:id/delete': 'deleteCar',
				'car/create': 'createCar'
			}
		});

		appMain.on("car:show", function(id){
			//appMain.navigate("car/" + id);
			controller.showCar(id);
		});

		appMain.on("car:edit", function(id){
			//appMain.navigate("car/" + id + "/edit");
			controller.editCar(id);
		});

		appMain.on("car:delete", function(id){
			//appMain.navigate("car/" + id + "/delete");
			controller.editCar(id);
		});
		
		appMain.on("before:start", function(){
			console.log('init cars');
			//appMain.header.show(header);
			new Router({
				controller: controller
			});

		});

		return Router;

	}
);