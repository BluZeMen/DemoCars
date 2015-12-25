define([
	'underscore',
	'marionette',
	'jquery',
	'./models',
	'tpl!./templates/cars-list-item.html',
	'tpl!./templates/cars-list.html',
	'tpl!./templates/car-info.html',
	'tpl!./templates/car-create.html',
	'tpl!./templates/car-edit.html',
	], 
	function(_, Marionette, $, models,
			 carsLiTpl, carsLstTpl, carInfoTpl, carCreateTpl, carEditTpl) {


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

			triggers: {
				'click a.js-edit': 'car:edit',
				'click a.js-show': 'car:show',
				'click a.js-delete': 'car:delete',
			}
		});

		var CarsList = Marionette.CompositeView.extend({
			childView: CarsListItem,
			childViewContainer: 'tbody',
			template: carsLstTpl
		});

		var CarInfo = Marionette.ItemView.extend({
			template: carInfoTpl,

			templateHelpers:{
				mediaUrl: function(mediaName){
					if(!mediaName){
						return models.server.static_url + 'cars/img/photo-placeholder.png';
					}
					return models.server.media_url + mediaName;
				}
			},

		    triggers: {
				'click button.js-edit': 'car:edit',
				'click button.js-delete': 'car:delete',
			}
		});

		var CarCreate = Marionette.ItemView.extend({
			tag: 'div',
			template: carCreateTpl,
			title: 'Create a new car',

			templateHelpers:{
				mediaUrl: function(mediaName){
					if(!mediaName){
						return models.server.static_url + 'cars/img/photo-placeholder.png';
					}
					return models.server.media_url + mediaName;
				}
			},

		    triggers: {
				'click .btn.js-create':  {
					event: 'car:create dialog:close',
					preventDefault: true, 
					stopPropagation: true
				},
				'click .btn.js-cancel': 'dialog:close',
			},

			getData: function(){
				var data = {};
				this.$('input, textarea').each(function(i, e){
					var el = $(e);
					if(el.attr('type') == 'number'){
						data[el.attr('name')] = +el.val();
					}else{
						data[el.attr('name')] = el.val();
					}
				});
				return data;
			}
		});

		var CarEdit = Marionette.ItemView.extend({
			template: carEditTpl,

			templateHelpers:{
				mediaUrl: function(mediaName){
					if(!mediaName){
						return models.server.static_url + 'cars/img/photo-placeholder.png';
					}
					return models.server.media_url + mediaName;
				}
			},

		    triggers: {
				'click .btn.js-save': 'car:save',
				'click .btn.js-delete': 'car:delete',
				'click .btn.js-delete-img': 'car:delete:image',
				'click .btn.js-load-image': 'car:load:image',
			},

			getData: function(){
				var data = {};
				this.$('.js-form input, .js-form textarea').each(function(i, e){
					var el = $(e);
					if(el.attr('type') == 'number'){
						data[el.attr('name')] = +el.val();
					}else{
						data[el.attr('name')] = el.val();
					}
				});
				return data;
			}
		});

		return {
			CarEdit: CarEdit,
			CarsList: CarsList,
			CarInfo: CarInfo,
			CarCreate: CarCreate
		};
});