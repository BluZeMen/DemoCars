define([
	'appMain',
	'underscore',
	'marionette',
	'jquery',
	'tpl!./templates/about.html',
	], 
	function(appMain, _, Marionette, $,
			 headerTpl) {
		var AboutUs = Marionette.ItemView.extend({
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
		    },

		    getBody: function(){
		    	return this.$('#about').text();
		    },

		    setEditable: function(editable){
				if(editable){
					this.$('.btn').text('Save');
					this.$('#about').attr('contenteditable', 'true');
					this.$('.panel-default').removeClass('panel-default').addClass('panel-success');
					this.editMode = true;
				}else{
					this.$('.btn').text('Edit');
					this.$('#about').attr('contenteditable', 'false');
					this.$('.panel-success').removeClass('panel-success').addClass('panel-default');
					this.editMode = false;
				}
		    },

		});

		return {
			AboutUs: AboutUs
		};
});