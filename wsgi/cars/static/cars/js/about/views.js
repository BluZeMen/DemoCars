define([
	'appMain',
	'underscore',
	'marionette',
	'jquery',
	'tpl!./templates/about.html',
	], 
	function(appMain, _, Marionette, $,
			 headerTpl) {
		appMain.module("about.view", function(View, appMain){
			View.AboutUs = Marionette.ItemView.extend({
				tagName: 'div',
				className: 'row',
				template: headerTpl,
				editMode: false,

				events: {
			    	'click .btn': 'clickChange',
			    },

			    clickChange: function(e){
			    	e.preventDefault();
			    	if(this.editMode){
			    		this.trigger('about:save', this.model);
			    	}else{
			    		this.trigger('about:edit', this.model);
			    	}
			    	console.log('Change edti mode: ', this.editMode);
			    },

			    setEditable: function(editable){
					if(editable){
						this.$('.btn').text('Save');
						this.$('#about').attr('contenteditable', 'true');
						this.editMode = true;
					}else{
						this.$('.btn').text('Edit');
						this.$('#about').attr('contenteditable', 'false');
						this.editMode = false;
					}
			    },

			});
		});

		return {
			AboutUs: appMain.about.view.AboutUs
		};
});