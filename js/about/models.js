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
					return { code: 1, sender: this, 
						msg : 'Body of about page is empty: '+attrs.body };
				}

				if(attrs.body.length < this.get('bodyLenMinLimit')){
					return { code: 2, sender: this, 
						msg : 'Body of about page is too short, less than '+
							   this.get('bodyLenMinLimit')+' symbols' };
				}
			}
			
		});

	return {
		AboutUs: AboutUs
	};

});