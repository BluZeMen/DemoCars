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

			setActive: function(name){
				this.$('nav li.active').removeClass('active');
				this.$('nav li[href="#'+name+'"]').addClass('active');
			},

			setAbout: function(text){
				var toDisplay = text.slice(0, 150)+'...';
				this.$('#header-about').text(toDisplay);
				this.$('#header-about').removeClass('hidden');
			}
		});

		return {
			Header: Header
		};
});