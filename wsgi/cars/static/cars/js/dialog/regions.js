define([
	'backbone',
	'marionette',
	'jquery',
	], 
	function(Backbone, Marionette, $) {

		var DialogRegion = Marionette.Region.extend({
			onShow: function(view){
				this.listenTo(view, "dialog:close", this.closeDialog);
				var self = this;
				this.$el.dialog({
					modal: true,
					title: view.title,
					width: "auto",
					close: function(e, ui){
						self.closeDialog();
					}
				});
			},

			closeDialog: function(){
				this.stopListening();
				this.empty ? this.empty() : 0;
				this.close ? this.close() : 0;
				this.$el.dialog("destroy");
			}
		});

		return {
			DialogRegion: DialogRegion
		};
	}
);