define(['marionette'],
function(Marionette){
    var appMain = new Marionette.Application();

    appMain.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    appMain.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };

    appMain.startSubApp = function(appName, args){
        var currentApp = appName ? appMain.module(appName) : null;
        if (appMain.currentApp === currentApp){ return; }

        if (appMain.currentApp){
          appMain.currentApp.stop();
        }

        appMain.currentApp = currentApp;
        if(currentApp){
            console.log('start', args);
            currentApp.start(args);
        }
    };

    appMain.on('before:start', function(){
        var RegionContainer = Marionette.LayoutView.extend({
            el: "#app-container",

            regions: {
                header: '#header',
                main: '#main',
                dialog: '#dialog'
            }
        });
        appMain.regions = new RegionContainer();

        appMain.regions.dialog.onShow = function(view){
            var self = this;
            var closeDialog = function(){
              self.stopListening();
              self.empty();
              self.$el.dialog('destroy');
            };

            this.listenTo(view, 'dialog:close', closeDialog);

            this.$el.dialog({
              modal: true,
              title: view.title,
              width: 'auto',
              close: function(e, ui){
                closeDialog();
              }
            });
        };
    });

    appMain.on('start', function(){
      if(Backbone.history){
        require(['cars', 'header', 'about'], function () {
          Backbone.history.start();
          if(appMain.getCurrentRoute() === ""){
            appMain.trigger("car:list");
          }
        });
      }
    });

    return appMain;
});