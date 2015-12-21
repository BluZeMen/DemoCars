define([
	'underscore',
	'backbone',
	'./models'
	], 
	function(_, Backbone, models) {
		var CarsList = Backbone.Collection.extend({
			model: models.Car,
			url: '/api/v1/car/?format=json',

			initialize: function(){
				var cars = [
					{id: 1, photo: ['http://placehold.it/350x150'], 
					model: 'Hundai SX5', price: 50000, description: 'Very good car',
					year: 1995, createdAt: 'Kioto'},
					{id: 2, photo: ['http://placehold.it/350x150'], 
					model: 'Hundai SX12', price: 12000, description: 'Good car',
					year: 1996, createdAt: 'Kioto'}
				];
				//this.add(cars);
			},

			parse: function(response) {
				return response.objects;
			}
		});

		return {
			CarsList: CarsList
		};
	}
);