define([
	'appMain',
	'underscore',
	'marionette',
	'./views',
	], 
	function(appMain, _, Marionette, views) {
		
		var headerView;

		return {
			show: function(){
				headerView = new views.Header();
				appMain.regions.header.show(headerView);
			},

			setAbout: function(about){
				console.log('set about');
				headerView.setAbout(about.escape('body'));
			},

			setActive: function(headerUrl){
				headerView.setActive(headerUrl);
			},
		};
	}
);