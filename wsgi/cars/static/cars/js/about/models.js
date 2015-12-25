define([
	'appMain',
	'underscore',
	'backbone'
	], 
	function(appMain, _, Backbone) {

		var AboutUs = Backbone.Model.extend({
			defaults: {
				body: '',
				bodyLenMinLimit: 200
			},

			url: '/api/v1/page/about-us/?format=json',

			initialize: function(){
				this.bind('sync', this.onUpdate);
			},

			onUpdate: function(){
				appMain.vent.trigger('about:updated', this);
			},
			
			validate: function(attrs, options){
				return;

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