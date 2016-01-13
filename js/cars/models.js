define([
	'underscore',
	'backbone',
	], 
	function(_, Backbone, Store) {

		var Query = Backbone.Model.extend({
			defaults:{
				string: '',
				order: null
			},

			// Backbone.Collection.comparator compatible
			collectionComparator: function(item1, item2){
				return item1.compare(this, item2);
			},

			// _.filter() compatible
			viewFilter: function (item, index, collection) {
				return item.filter(this);
			}
		});

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

		var Car = Backbone.Model.extend({
			defaults: {
				photo: [],
				model: '',
				price: -1,
				description: '',
				year: 0,
				createdAt: ''
			},

			addPhoto: function(id, url){
				var photo = this.get('photo');
				var isContains = _.findWhere(photo, {id: id});
				if(isContains)
					return;
				photo.push({id:id, url: url});
			},

			delPhoto: function(id){
				var photo = this.get('photo');
				var contains = _.findWhere(photo, {id: id});
				console.log('del contains:', contains, 'id=', id);
				this.set('photo', 
						 _.reject(this.get('photo'), 
								  function(ph){return ph.id==id;}
								 )
						);
			},

			compare: function(query, car){
				var val = 0;
				if(query.get('order')){
					val += comparators[query.get('order')](this, car);;
				}
				return val;
				
			},

			filter: function(query){
				// filter by model string matching
				return this.get('model').toLowerCase().indexOf(query.get('string').toLowerCase()) >= 0;
			},

		});

		var serverInfo = {
			static_url: '',
			media_url: 'media/',
		};

	return {
		server: serverInfo,
		Car: Car,
		Query: Query,
	};

});