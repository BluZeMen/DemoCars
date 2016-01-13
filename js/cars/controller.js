define([
	'appMain',
	'underscore',
	'marionette',
	'./collections',
	'./views',
	'./models',
	'dialog',
	'localstorage',
	], 
	function(appMain, _, Marionette, collections, views, models, dialog) {

		var carsList = new collections.CarsList();   // main container, contains all cars
		var displayList = new collections.CarsList();   // contains diaplayable cars 
		var carsPerPage = 4;  // config, cars per page 
		var pagesCnt; // total count of pages
		var query = new models.Query();
		carsList.comparator = _.bind(query.collectionComparator, query);

		query.on('change:order', function(){
			controller.listCars();
		});

		query.on('change:string', function(){
			controller.listCars();
		});


		//
		// this code for initial collection filling
		carsList.fetch();
		if(carsList.length < 1){
			carsList.fillRandom(10); // argumetn - is a count of initialized cars
			carsList.invoke('save');
		}

		var controller = {

			listCars: function(){
				carsList.fetch({success: function(){

					var viewOptions = {
						listFilter: _.bind(query.viewFilter, query),
						collection : carsList,
						itemsPerPage: carsPerPage,
					};
					
					if(appMain.regions.main.currentView){
						appMain.regions.main.currentView.updateList(viewOptions);
					}else{
						var view = new views.QueriedCarsList(viewOptions);
						appMain.regions.main.show(view);
					}
				}});
				appMain.execute("set:active:header", "/");
			},

			listSort: function(newSortOrder){
				console.log('listSort = ', newSortOrder);
				var old = query.get('order');
				if(old != newSortOrder){
					query.set('order', newSortOrder);
				}
			},

			queryStringChange: function( str){
				query.set('string', str);
			},

			showCar: function(id){
				carsList.fetch();
				appMain.regions.main.show(new views.CarInfo({ model: carsList.get(id)}));
				appMain.execute("set:active:header", "/car/"+id);
			},

			editCar: function(id){
				carsList.fetch();
				appMain.regions.main.show(new views.CarEdit({ model: carsList.get(id)}));
				appMain.execute("set:active:header", "/car/"+id);
			},

			saveCar: function(e){
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
					e.model.save({}, {
						error: function(model, error) {
							console.log(model.toJSON());
							console.log(error.responseText);
						},
						success: function(){
							console.log('saved');
							appMain.navigate('/');
						}
					});
				}
			},

			loadImage: function(e){
				if(!e.path)
					return
				// idea of "id" is grows up from backend - images stored in a individual table.
				e.model.addPhoto(_.random(9999999), e.path);
				e.model.save();

				controller.editCar(e.model.id);
			},

			deleteImage: function(e){
				e.model.delPhoto(e.photoId);
				e.model.save();
				controller.editCar(e.model.id);
			},

			deleteCar: function(id){
				console.log("detele car");
				var car;
				if(carsList.length == 0){
					carsList.fetch();
				}

				var car = carsList.get(id);
				
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
				var thisListCars = carsList;
				dial.on('car:create', function(e){
					var data = dial.getData();
					
					carsList.fetch(); // getting a actual list of cars

					// check, if this model already exists
					var hits = carsList.where({model: data.model});
					if(hits.length){
						dial.trigger('dialog:close');
						appMain.vent.trigger('dialog:show:alert',{
							title: 'Error',
							body: 'This model name is alredy exists! Try another model name',
						});
						return;
					}

					// getting the id of new entry in table of cars
					var ids = carsList.pluck('id');
					ids.push(0);
					var id = _.max(ids) + 1;
					data['id'] = id;
					
					var car = new models.Car(data);
					carsList.add(car);
					car.save();
					dial.trigger('dialog:close');
					appMain.navigate('/');

				});
				appMain.regions.dialog.show(dial);
			}
		};
		
		return controller;
	}
);