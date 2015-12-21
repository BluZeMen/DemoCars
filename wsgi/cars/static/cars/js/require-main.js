requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    packages: ['cars', 'header', 'about'],
    paths: {
        jquery: 'lib/jquery',
        bootstrap: 'lib/bootstrap',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        marionette: 'lib/backbone.marionette',
        require: 'lib/require',
        tpl: 'lib/tpl',
        appMain: 'app',
        server: '/api/server-info'
    },
    shim: {
        backbone: {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery']
        },
        marionette : {
            exports : 'Backbone.Marionette',
            deps : ['backbone']
        }
    }
});



// Start the main app logic.
requirejs(['appMain', 'header', 'cars', 'about'],
function (appMain) {
    appMain.start();
});
