define([
	'underscore',
	'backbone',
	'./models',
	'localstorage',
	], 
	function(_, Backbone, models) {
		var CarsList = Backbone.Collection.extend({
			model: models.Car,
			localStorage: new Backbone.LocalStorage('carsStorage'),

			// just for testing
			fillRandom: function(cnt){
				var names = ['Hundai', 'Toyota', 'Mersedes', 'BMW', 'WolksWagen', 'Ford', 'Dodge', 'Chrysler', 'Tesla'];
				var literals = ['SX', 'SL', 'E', 'LT', 'CK', 'RT', 'L', 'Q', 'C', 'T'];
				var descriptions = ['Good car!', 'Really nice car.', 'Not bad car', 'Gorgeus, great car!', 'Funny price for this car'];
				var places = ['Jarpan', 'Bavaria', 'Detroit', 'Boston', 'Tolyati'];
				var photos = [
					{ id: 1, url: 'tesla.jpg'}, 
					{ id: 2, url: 'pb.png'}, 
					{ id: 3, url: 'chal.jpg'}, 
					{ id: 4, url: 'ty.jpg'}, 
					{ id: 5, url: 'mus.jpg'}, 
					{ id: 6, url: 'wv.jpg'}, 
				];
				
				var cars = [];
				for(var i = 1; i <= cnt; i++){
					var data = this.createRandomData(names, 
						literals, descriptions, places, photos);
					data['id'] = i;
					cars.push(data);
				}
				
				this.add(cars);
			},

			createRandomData: function(modelNames, modelLiterals, descriptions, places, photos){
				var d = {};
				d.year = _.random(1950, 2015);
				d.model = _.sample(modelNames) + ' ' + _.sample(modelLiterals) + _.random(1, 10);
				d.description = _.sample(descriptions);
				d.createdAt = _.sample(places);
				d.price = _.random(10000, 80000);
				d.photo = _.sample(photos, _.random(1, 4));
				return d;
			}

		});

		return {
			CarsList: CarsList
		};
	}
);