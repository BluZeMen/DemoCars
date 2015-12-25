define([
	'underscore',
	'backbone'
	], 
	function(_, Backbone) {

		var SearchQuery = Backbone.Model.extend({
			defaults: {
				string: ''
			},
			empty: function(){
				return !this.get('string');
			},
			match: function(model){
				if(model.searchQueryMatch){
					return model.searchQueryMatch(this);
				}
				return -1;
			},
			matchStringIC: function(str){
				return str.toLowerCase().indexOf(this.get('string').toLowerCase()) >= 0;
			}
		});


		var Car = Backbone.Model.extend({
			defaults: {
				photo: [],
				model: '',
				price: -1,
				description: '',
				year: null,
				createdAt: ''
			},

			urlRoot: '/api/v1/car/',
			url : function(){
				if(this.id){
					return this.urlRoot + this.id + '/?format=json';
				}
				return this.urlRoot;
			},

			urlCreate: function(){
				return this.urlRoot;
			},
			
			searchQueryMatch: function(query){
				var res = -1;
				if(query.matchStringIC(this.get('model'))){
					res++;
				}
				if(query.matchStringIC(''+this.get('year'))){
					res++;
				}
				if(query.matchStringIC(this.get('createdAt'))){
					res++;
				}
				return res;
			}
		});

		var Photo = Backbone.Model.extend({
			defaults: {
				src: ''
			},

			urlRoot: '/api/v1/car/',
			url : function(){
				return this.urlRoot + this.id + '?format=json';
			},
			
		});

		var AboutUs = Backbone.Model.extend({
			defaults: {
				slug: '',
				body: ''
			},

			url: '/api/v1/page/about-us?format=json'
			
		});

		var serverInfo;
		$.ajax({ dataType: 'json', async: false, 
			url: '/api/server-info/',
			success: function(data) {
				serverInfo = data;
			}
		});


	return {
		server: serverInfo,
		Car: Car,
		Photo: Photo,
		SearchQuery: SearchQuery,
		AboutUs: AboutUs
	};

});