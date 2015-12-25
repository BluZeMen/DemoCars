define([
	'appMain',
	'underscore',
	'marionette',
	'./collections',
	'./views',
	'./models',
	'dialog',
	], 
	function(appMain, _, Marionette, collections, views, models, dialog) {

		var carsList = new collections.CarsList();

		var updateList = function(onFetch){
			appMain.execute("cars:fetching", carsList);
			carsList.fetch({success: onFetch});
		};

		var API = {
			listCars: function(criterion){
				updateList(function(){
					console.log("cars list");
					appMain.regions.main.show(new views.CarsList({collection : carsList}));
				});
				appMain.execute("set:active:header", "/");
			},

			showCar: function(id){
				console.log("show car");
				if(carsList.length == 0){
					var car = new models.Car({ id: id });

					car.fetch({success: function(){
						appMain.regions.main.show(new views.CarInfo({ model: car}));
						appMain.execute("set:active:header", "/car/"+id);
					}});
					return;
				}

				appMain.regions.main.show(new views.CarInfo({ model: carsList.get(id)}));
				appMain.execute("set:active:header", "/car/"+id);
			},

			editCar: function(id){
				console.log("edit car");

				if(carsList.length == 0){
					var car = new models.Car({ id: id });

					car.fetch({success: function(){
						appMain.regions.main.show(new views.CarEdit({ model: car}));
						appMain.execute("set:active:header", "/car/"+id);
					}});
					return;
				}

				appMain.regions.main.show(new views.CarEdit({ model: carsList.get(id)}));
				appMain.execute("set:active:header", "/car/"+id);
			},

			saveCar: function(e){
				console.log('saving...');
				var data = e.view.getData();
				var test = e.model.clone();
				test.set(data);
				if(!test.isValid()){
					console.log('validation error!');
					appMain.vent.trigger('dialog:show:alert',{
						title: 'Error',
						body: 'Error: invalid values. Please check it.',
					});
				}else{
					e.model.set(data);
					console.log('..valid', e.model);
					e.model.save({}, {
						error: function(model, error) {
							console.log(model.toJSON());
							console.log('error.responseText');
						},
						success: function(){
							console.log('saved');
							appMain.navigate('/');
						}
					});
				}
			},

			loadImage: function(e){

			},

			deleteCar: function(id){
				console.log("detele car");
				var car;
				if(carsList.length == 0){
					var car = new models.Car({ id: id });
				}else{
					car = carsList.get(id);
				}
				/*title, body, capationConfirm, capationCancel*/
				appMain.vent.trigger('dialog:show:confirm',{
					title: 'Confirm delete',
					body: ('You are trying to delete car ' +car.get('model')+ '. Are you shure?'),
					capationConfirm: 'Yes, I want delete car',
					onConfirm: function(){ 
						car.destroy(); 
						appMain.execute("set:active:header", '');
					}
				});
			},

			createCar: function(){
				console.log("create car");
				var dial = new views.CarCreate();
				dial.on('car:create', function(e){
					var data = dial.getData();
					
					if(!carsList.length){
						carsList.fetch({ 
							wait: true,
							error: function(model, error) {
								console.log(model.toJSON());
								console.log('error.responseText');
							}
						});
					}

					console.log("carsList: ", carsList);
					// temporary for developing
					var hits = carsList.where({model: data.model});
					if(hits.length){
						console.log('This model name is alredy exists! Try another model name');
						return;
					}
					var car = new models.Car();
					car.set(data);
					car.unset('_id');
					car.save({}, {
						error: function(model, error) {
							console.log(model.toJSON());
							console.log('error.responseText');
						},
						success: function(model, response){
							console.log('ok');
							carsList.fetch();
							appMain.navigate('/');
						}
					});
				})
				appMain.regions.dialog.show(dial);
				//appMain.execute("set:active:header", "/car/create");
			}
		};
		
		return API;
	}
);