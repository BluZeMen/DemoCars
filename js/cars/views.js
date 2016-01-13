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
	'tpl!./templates/paginator.html',
	], 
	function(_, Marionette, $, models,
			 carsLiTpl, carsLstTpl, carInfoTpl, carCreateTpl, carEditTpl, pgrTpl) {

		// formatter func filename > url 
		var mediaUrlFunc = function(mediaName){
			if(!mediaName){
				return models.server.static_url + 'img/photo-placeholder.png';
			}
			return models.server.media_url + mediaName;
		};


		var CarsListItem = Marionette.ItemView.extend({
			tagName: 'tr',
			template: carsLiTpl,

			templateHelpers:{
				mediaUrl: mediaUrlFunc
			},

			triggers: {
				'click a.js-edit': 'car:edit',
				'click a.js-show': 'car:show',
				'click a.js-delete': 'car:delete',
			}
		});


		// designed for showing instead of collection, when no entities in collection
		var CarsListItemEmpty = Marionette.ItemView.extend({
			tagName: 'tr',
			template: _.template('<td colspan="5"><h3>No car in base yet</h3><h4>Try to <a href="#/car/create">add one</a></h4></td>')
		});


		// list view of cars
		var CarsList = Marionette.CollectionView.extend({
			//tagName: 'tbody',
			childView: CarsListItem,
			emptyView: CarsListItemEmpty,
			
		});


		var Paginator = Marionette.ItemView.extend({
			tag: 'nav',
			template: pgrTpl,

			triggers: {
				'click a.js-page-next': 'paginator:next',
				'click a.js-page-prev': 'paginator:prev',
				'click .active a': 'paginator:active', 
			},

			events:{
				'click a.js-page-sel': 'onGoto',
				//'click a.js-page-prev': 'onPrev',
			},

			templateHelpers: function(){
				return{
					pagesCnt: this.pagesCnt,
					currentPage: this.currentPage,
				}
			},

			initialize: function(opts){
				this.currentPage = opts.currentPage;
				this.pagesCnt = opts.pagesCnt;
			},

			onGoto: function(e){
				e.preventDefault();
				e.stopPropagation();
				var page = +$(e.target).text();
				this.triggerMethod('paginator:goto', page); // why not catching?
			},
		});


		// holder for homepage(cars list, sort, pagination)
		var QueriedCarsList = Marionette.LayoutView.extend({
			template: carsLstTpl,

			regions:{
				list: 'tbody',
				paginator: '#paginator'
			},

			triggers: {
				'click .btn.js-default': 'sort:default',
				'click .btn.js-cheaper': 'sort:cheaper',
				'click .btn.js-expensive': 'sort:expensive',
				'click .btn.js-az': 'sort:az',
				'click .btn.js-za': 'sort:za',
			},

			events: {
				'click .js-filter .btn': 'onButtonClick',
				'keyup #searchQuery': 'onQueryStringChange',
			},

			queryString: '',

			initialize: function(opts){
				this.initOpts = opts;

				// to disable wrapping
				this.list.attachHtml = function(view) {
					// empty the node and append new view
					//console.log('cn:', view.el.childNodes);
					this.el.innerHTML="";
					$(this.el).append(view.el.childNodes);
				}
			},

			onShow: function(){
				this.updateList();
			},

			updateList: function(opts){
				if(opts){
					this.initOpts = opts;
				}
				this.list.show(new CarsList(this.initOpts));
				this.paginator.show(new Paginator(this.initOpts));
			},

			setListFilter: function(filterFunc){
				this.list.currentView.filter = filterFunc;
			},

			onButtonClick: function(e){
				this.$('.js-filter .btn').removeClass('active');
				$(e.target).addClass('active');
			},

			onQueryStringChange: function(e){
				this.queryString = $(e.target).val();
				this.triggerMethod('sort:query', this.queryString);
				e.preventDefault();
				e.stopPropagation();
			}

		});


		// simple view for showing car info
		var CarInfo = Marionette.ItemView.extend({
			template: carInfoTpl,

			templateHelpers:{
				mediaUrl: mediaUrlFunc
			},

		    triggers: {
				'click button.js-edit': 'car:edit',
				'click button.js-delete': 'car:delete',
			}
		});


		// Create car dialog view...
		var CarCreate = Marionette.ItemView.extend({
			tag: 'div',
			template: carCreateTpl,
			title: 'Create a new car',

			templateHelpers:{
				mediaUrl: mediaUrlFunc
			},

		    triggers: {
				'click .btn.js-create': 'car:create dialog:close',
				'click .btn.js-cancel': 'dialog:close',
			},

			// Form data grabber
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


		// Edit page of car
		var CarEdit = Marionette.ItemView.extend({
			template: carEditTpl,

			templateHelpers:{
				mediaUrl: mediaUrlFunc
			},

		    triggers: {
				'click .btn.js-save': 'car:save',
				'click .btn.js-delete': 'car:delete',
			},

			events:{
				'click .btn.js-load-image': 'clickLoadImage',
				'click .btn.js-delete-image': 'clickDeleteImage',
			},

			clickLoadImage: function(e){
				e.preventDefault();
				var fullPath = this.$('#image-input').val();
				if (fullPath) {
					fullPath = fullPath.split(/(\\|\/)/g).pop(); //getting filename of uploaded
				}
				this.trigger('image:load', {path: fullPath, model: this.model});
			},

			clickDeleteImage: function(e){
				e.preventDefault();
				var arg = {photoId: +$(e.target).attr('photoId'), model: this.model};
				this.trigger('image:delete', arg);
			},

			// View data grabber
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
			QueriedCarsList: QueriedCarsList,
			CarInfo: CarInfo,
			CarCreate: CarCreate
		};
});