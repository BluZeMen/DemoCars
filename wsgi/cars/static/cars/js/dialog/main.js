define([
	'appMain',
	'backbone',
	'marionette',
	'./regions',
	'./views',
	'./controller'
	], 
	function(appMain, Backbone, Marionette, regions, views, controller) {
		appMain.module('appDialog', function(dialog, appMain){

			dialog.DialogRegion = regions.DialogRegion;

			dialog.showConfirm = controller.showConfirm;
			dialog.showAlert = controller.showAlert;

			appMain.vent.on('dialog:show:confirm', function(args){
				controller.showConfirm(args.title, args.body, args.capationConfirm, 
										args.capationCancel, args.onConfirm, args.onCancel);
			});
			appMain.vent.on('dialog:show:alert', function(args){
				controller.showAlert(args.title, args.body, args.onOk)
			});

			dialog.on('start', function(){
				console.log('init dialog');
			});
		});

		return appMain.appDialog;
	}
);