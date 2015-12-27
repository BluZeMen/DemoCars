define(['marionette', 'jquery-ui'],
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
                dialog: appMain.appDialog.DialogRegion.extend({
                    el: '#dialog'
                })
            }
        });
        appMain.regions = new RegionContainer();
        
    });

    appMain.on('start', function(){
      if(Backbone.history){
        require(['cars', 'header', 'about', 'dialog'], function () {
          Backbone.history.start();
          if(appMain.getCurrentRoute() === ""){
            appMain.vent.trigger("car:list");
          }
        });
      }
    });

    return appMain;
});