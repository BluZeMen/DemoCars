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
				'' : 'listCars',
				'car/create': 'createCar',
				'car/:id': 'showCar',
				'car/:id/edit': 'editCar',
				'car/:id/delete': 'deleteCar',
			}
		});

		appMain.on("before:start", function(){
			console.log('init cars');

			appMain.regions.main.on("show", function(view, region, options){

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
				view.on('image:load', controller.loadImage);
				view.on('image:delete', controller.deleteImage);

				// sort
				var wrapSort = function(sortType){
					return function(){
						console.log('sort clicked:', sortType);
						controller.listSort(sortType);
					}
				};
				view.on('sort:default', wrapSort());
				view.on('sort:cheaper', wrapSort('cheaper'));
				view.on('sort:expensive', wrapSort('expensive'));
				view.on('sort:az', wrapSort('az'));
				view.on('sort:za', wrapSort('za'));
				view.on('sort:query', controller.queryStringChange);

				// paginator
				view.on('childview:paginator:next', controller.paginatorNext);
				view.on('childview:paginator:prev', controller.paginatorPrev);
				view.on('childview:paginator:goto', controller.paginatorGoto);
			});

			
			new Router({
				controller: controller
			});

		});

		return Router;

	}
);