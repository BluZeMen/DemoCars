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
				this.$('nav li:has([href="#'+name+'"])').addClass('active');
			},

			setAbout: function(text){
				var aboutLen = 150;
				var ending = text.length > aboutLen ? '...' : '';
				var txtToDisplay = text.slice(0, aboutLen) + ending;
				this.$('#header-about').text(txtToDisplay);
				this.$('#header-about').removeClass('hidden');
			}
		});

		return {
			Header: Header
		};
});