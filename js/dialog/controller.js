define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	], 
	function(appMain, _, Marionette, views) {

		return {
			showConfirm: function(title, body, capationConfirm, capationCancel, onConfirm, onCancel){
				var DialogConfirm = Backbone.Model.extend({});

				var view = new views.DialogConfirmView({
					model: new DialogConfirm({
						body: body,
						capationConfirm: (capationConfirm || 'Confirm'),
						capationCancel: (capationCancel || 'Cancel')
					})
				});
				view.title = title;
				appMain.regions.dialog.on("show", function(view){
					//view.bind('childview:car:list', controller.listCars);
					if(onConfirm){
						view.on('dialog:confirm', onConfirm);
					}
					if(onCancel){
						view.on('dialog:cancel', onCancel);
					}
				});
				appMain.regions.dialog.show(view);
			},

			showAlert: function(title, body, onOk){
				var DialogAlert = Backbone.Model.extend({});

				var view = new views.DialogAlertView({
					model: new DialogAlert({
						body: body,
					})
				});
				view.title = title;
				appMain.regions.dialog.on("show", function(view){
					//view.bind('childview:car:list', controller.listCars);
					if(onOk){
						view.on('dialog:ok', onOk);
					}

				});
				appMain.regions.dialog.show(view);
			},

		};
	}
);