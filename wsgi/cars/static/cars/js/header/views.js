define([
	'underscore',
	'marionette',
	'jquery',
	'tpl!./templates/header.html',
	], 
	function(_, Marionette, $,
			 headerTpl) {

		var Header = Marionette.ItemView.extend({
			tagName: 'header',
			className: 'row',
			template: headerTpl,
			ui: {
				about: '#header-about'
			},

			setActive: function(name){
				this.$('li').removeClass('active');
				this.$('li[href="#'+name+'"]').addClass('active');
			}
		});

		return {
			Header: Header
		};
});