define([
	'underscore',
	'backbone'
	], 
	function(_, Backbone) {

		var AboutUs = Backbone.Model.extend({
			defaults: {
				slug: '',
				body: ''
			},

			url: '/api/v1/page/about-us?format=json'
			
		});

	return {
		AboutUs: AboutUs
	};

});