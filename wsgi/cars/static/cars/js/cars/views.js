define([
	'underscore',
	'marionette',
	'jquery',
	'./models',
	'tpl!./templates/cars-list-item.html',
	'tpl!./templates/cars-list.html',
	'tpl!./templates/car-info.html',
	'tpl!./templates/car-form.html',
	], 
	function(_, Marionette, $, models,
			 carsLiTpl, carsLstTpl, carInfoTpl, carFormTpl) {


		var CarsListItem = Marionette.ItemView.extend({
			tagName: 'tr',
			template: carsLiTpl,

			templateHelpers:{
				mediaUrl: function(mediaName){
					if(!mediaName){
						return models.server.static_url + 'cars/img/photo-placeholder.png';
					}
					return models.server.media_url + mediaName;
				}
			},

		    events: {
		    	'click a.js-edit': 'clickEdit',
		    	'click a.js-view': 'clickView',
		    	'click a.js-delete': 'clickDelete'
		    },

		    triggers: {
				'click a.js-edit': 'car:edit',
				'click a.js-view': 'car:view',
				'click a.js-delete': 'car:delete',
			},

		    /*
			clickEdit: function(e){
		    	e.preventDefault();
		    	console.log('edit', e);
		    	this.trigger('car:edit', this.model);
		    },

		    clickView: function(e){
		    	e.preventDefault();
		    	this.trigger('car:view', this.model);
		    },

		    clickDelete: function(e){
		    	e.preventDefault();
		    	this.trigger('car:delete', this.model);
		    }
		    */

		});

		var CarsList = Marionette.CompositeView.extend({
			childView: CarsListItem,
			childViewContainer: 'tbody',
			template: carsLstTpl
		});

		var CarInfo = Marionette.ItemView.extend({
			tagName: 'form',
			template: carInfoTpl,

			templateHelpers:{
				mediaUrl: function(mediaName){
					if(!mediaName){
						return models.server.static_url + 'cars/img/photo-placeholder.png';
					}
					return models.server.media_url + mediaName;
				}
			},

		    events: {
		    	'click a.js-edit': 'clickEdit',
		    },

		    clickEdit: function(e){
		    	e.preventDefault();
		    	this.trigger('car:edit', this.model);
		    }

		});

		var CarCreate = Marionette.ItemView.extend({
			tagName: 'form',
			template: carFormTpl,

			templateHelpers:{
				mediaUrl: function(mediaName){
					if(!mediaName){
						return models.server.static_url + 'cars/img/photo-placeholder.png';
					}
					return models.server.media_url + mediaName;
				}
			},

		    events: {
		    	'click a.js-save': 'clickSave',
		    },

		    clickSave: function(e){
		    	e.preventDefault();
		    	this.trigger('car:save', this.model);
		    }

		});

		return {
			CarsList: CarsList,
			CarInfo: CarInfo,
			CarCreate: CarCreate
		};
});