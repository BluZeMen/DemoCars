define([
	'backbone',
	'marionette',
	'jquery',
	'tpl!./templates/confirm.html',
	'tpl!./templates/alert.html',
	], 

function(Backbone, Marionette, $,
		 dialogConfirmTpl, dialogAlertTpl) {

	var DialogConfirmView = Marionette.ItemView.extend({
		template: dialogConfirmTpl,

		triggers: {
			'click button.js-confirm': 'dialog:confirm dialog:close',
			'click button.js-cancel': 'dialog:cancel dialog:close'
		}

	});

	var DialogAlertView = Marionette.ItemView.extend({
		template: dialogAlertTpl,

		triggers: {
			'click button.js-ok': 'dialog:ok dialog:close',
		}

	});

	return {
		DialogAlertView: DialogAlertView,
		DialogConfirmView: DialogConfirmView
	};
});