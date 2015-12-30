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
		var currentPage = 1;  // state of app: number of displayable page 
		var carsPerPage = 4;  // config, cars per page 
		var pagesCnt; // total count of pages
		var sortOrder; // current sorting order of carsList

		//
		// this code for initial collection filling
		carsList.fetch();
		if(carsList.length < 1){
			carsList.fillRandom(10); // argumetn - is a count of initialized cars
			carsList.invoke('save');
		}

		// console.log(carsList);

		// comparators for sorting carsList
		var comparators = {
			cheaper: function(c1, c2){
				return c1.get('price') - c2.get('price');
			},
			expensive: function(c1, c2){
				return c2.get('price') - c1.get('price');
			},
			az: function(c1, c2){
				return c1.get('model').localeCompare(c2.get('model'));
			},
			za: function(c1, c2){
				return c2.get('model').localeCompare(c1.get('model'));
			},
		};

		var controller = {

			listCars: function(){
				carsList.fetch({success: function(){
					// pagination
					pagesCnt = carsList.length / carsPerPage >> 0;
					if(carsList.length % carsPerPage){ // if pages owerflow 
						pagesCnt++;
					}

					var viewOptions = {
						collection : displayList,
						currentPage: currentPage,
						pagesCnt: pagesCnt
					};

					displayList.reset();
					displayList.add(carsList.slice((currentPage-1)*carsPerPage, currentPage*carsPerPage));
					// viewing 
					var view = new views.CarsList(viewOptions);
					appMain.regions.main.show(view);
				}});
				appMain.execute("set:active:header", "/");
			},

			// setter for sorting ist
			listSort: function(newSortOrder){
				if(newSortOrder == sortOrder)
					return;
				carsList.comparator = comparators[newSortOrder];
				controller.listCars();
				sortOrder = newSortOrder;
			},

			paginatorGoto: function(page){
				console.log('goto', page);
				currentPage = page;
				controller.listCars();
			},

			paginatorNext: function(){
				if(currentPage < pagesCnt) currentPage++;
				controller.listCars();
			},

			paginatorPrev: function(){
				if(currentPage > 1) currentPage--;
				controller.listCars();
			},

			showCar: function(id){
				console.log("show car");
				carsList.fetch();
				appMain.regions.main.show(new views.CarInfo({ model: carsList.get(id)}));
				appMain.execute("set:active:header", "/car/"+id);
			},

			editCar: function(id){
				console.log("edit car");

				carsList.fetch();
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