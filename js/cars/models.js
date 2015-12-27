define([
	'underscore',
	'backbone',
	], 
	function(_, Backbone, Store) {

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
		});

		var serverInfo = {
			static_url: '/',
			media_url: '/media/',
		};

	return {
		server: serverInfo,
		Car: Car,
	};

});