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
				body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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