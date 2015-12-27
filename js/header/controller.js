define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	], 
	function(appMain, _, Marionette, views) {
		
		var headerView;

		var controller = {
			show: function(){
				headerView = new views.Header();
				appMain.regions.header.show(headerView);
			},

			setAbout: function(about){
				console.log('set about');
				if(!appMain.regions) return;
				if(!headerView) controller.show();
				headerView.setAbout(about.escape('body'));
			},

			setActive: function(headerUrl){
				headerView.setActive(headerUrl);
			},
		};
		return controller;
	}
);