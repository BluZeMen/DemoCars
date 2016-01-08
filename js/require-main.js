requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    packages: ['cars', 'header', 'about', 'dialog'],
    paths: {
        jquery: 'lib/jquery',
        localstorage: "lib/backbone.localstorage",
        'jquery-ui': 'lib/jquery-ui',
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
        localstorage: ["backbone"],
        marionette : {
            exports : 'Backbone.Marionette',
            deps : ['backbone']
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        "jquery-ui": ["jquery"],
        bootstrap: {
            deps: ['jquery']
        },
        'jquery.range': {
            deps: ['jquery']
        },

    }
});



// Start the main app logic.
requirejs(['appMain', 'header', 'cars', 'about', 'dialog'],
function (appMain) {
    appMain.start();
});
