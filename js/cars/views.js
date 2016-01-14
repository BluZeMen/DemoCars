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
			template: _.template('<td colspan="5"><h3>No cars by such criteria</h3><h4>Try to <a href="#/car/create">add one</a></h4></td>')
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

			triggers:{
				'click ul.pagination a': 'paginator:change',
				'click .active a': 'paginator:active', 
			},

			events:{
				'click a.js-page-next': 'onNext',
				'click a.js-page-prev': 'onPrev',
				'click a.js-page-sel': 'onGoto',
			},

			currentPage: 1,  // state of app: number of displayable page 

			templateHelpers: function(){
				return{
					getPagesCnt: this.getPagesCnt,
					currentPage: this.currentPage,
				}
			},

			initialize: function(opts){
				this.itemsPerPage = opts.itemsPerPage;
				this.itemsCnt = opts.collection.length;
				this.getPagesCnt = _.bind(this.getPagesCnt, this);
			},

			getPagesCnt: function(){
				var pagesCnt = this.itemsCnt / this.itemsPerPage >> 0;
				if(this.itemsCnt % this.itemsPerPage){ // if page owerflow 
					pagesCnt++;
				}
				return pagesCnt
			},

			onGoto: function(e){
				e.preventDefault();
				e.stopPropagation();
				this.currentPage = +$(e.target).text();
			},

			onNext: function(){
				if(this.currentPage < this.getPagesCnt()) this.currentPage++;
			},

			onPrev: function(){
				if(this.currentPage > 1) this.currentPage--;
			},

			paginatorFilter: function(){
				var self = this;
				return function(child, index, collection){
					var startIndex = (self.currentPage - 1) * self.itemsPerPage;
					var endIndex = self.currentPage * self.itemsPerPage;
					return index >= startIndex && index < endIndex;
				};
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

			initialize: function(opts){
				this.initOpts = opts;

				// to disable wrapping
				this.list.attachHtml = function(view) {
					// empty the node and append new view
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
				
				// clone original collection for usage in future
				if(!this.initOpts.origCollection){
					this.initOpts.origCollection = this.initOpts.collection.clone();
				}
				
				// replacing view collection items by items of page
				this.initOpts.collection.reset();
				this.initOpts.collection.add(this.initOpts.origCollection.filter(this.initOpts.listFilter));// collection filter
				
				var listView = new CarsList(this.initOpts);
				var paginatorView = new Paginator(this.initOpts);
				paginatorView.currentPage = +!this.paginator.currentView || this.paginator.currentView.currentPage;
			
				listView.filter = paginatorView.paginatorFilter(); // page filter

				this.list.show(listView);
				this.paginator.show(paginatorView);
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
