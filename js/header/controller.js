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
				if(headerView) headerView.setAbout(about.get('body'));
			},

			setActive: function(headerUrl){
				headerView.setActive(headerUrl);
			},
		};
		return controller;
	}
);