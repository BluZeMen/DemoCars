define([
	'appMain',
	'underscore',
	'marionette',
	'./collections',
	'./views',
	], 
	function(appMain, _, Marionette, collections, views) {

		var carsList = new collections.CarsList();

		var updateList = function(onFetch){
			appMain.execute("cars:fetching", carsList);
			carsList.fetch({success: onFetch});
		};

		updateList();

		var API = {
			listCars: function(criterion){
				updateList(function(){
					console.log("cars list");
					appMain.regions.main.show(new views.CarsList({collection : carsList}));
					//appMain.execute("set:active:header", "/");
				});
			},

			showCar: function(id){
				console.log("show car");
				appMain.regions.main.show(new views.CarInfo(carsList.get(id)));
				//appMain.execute("set:active:header", "/car/1"+id);
			},

			editCar: function(id){
				console.log("edit car");
				console.log(carsList.get(id));
				appMain.regions.main.show(new views.CarInfo(carsList.get(id)));
				//appMain.execute('set:active:header', '/car/'+id+'/edit');
			},

			deleteCar: function(id){
				console.log("detele car");
				console.log(carsList.get(id));
				//appMain.regions.main.show(new views.CarInfo(carsList.get(id)));
				//appMain.execute('set:active:header', '/car/'+id+'/edit');
			},

			createCar: function(){
				console.log("create car");
				appMain.regions.main.show(new views.CarCreate());
				//appMain.execute("set:active:header", "/car/create");
			}
		};
		
		return API;
	}
);