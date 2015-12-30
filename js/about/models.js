define([
	'appMain',
	'underscore',
	'backbone',
	'localstorage'
	], 
	function(appMain, _, Backbone) {

		var aboutStorage; 	
		/*
		localStorage: (function(){
				if(!aboutStorage){
					aboutStorage = new Backbone.LocalStorage('aboutStorage');
				}
				return aboutStorage;
			}()),
		*/
		var AboutUs = Backbone.Model.extend({
			defaults: {
				body: 'Some default about content',
				bodyLenMinLimit: 200
			},

			localStorage:  new Backbone.LocalStorage('aboutStorage'),
			
			validate: function(attrs, options){
				if(!attrs.body){
					return 'Body of about page is empty: ' + attrs.body;
				}
				if(attrs.body.length < attrs.bodyLenMinLimit){
					return 'Body of about page is too short, less than '+
							   attrs.bodyLenMinLimit + ' symbols';
				}
			}
			
		});

	return {
		AboutUs: AboutUs
	};

});