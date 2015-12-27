define([
  'appMain', 
  'underscore', 
  'backbone', 
  'localstorage'], 
  function(appMain, _, Backbone){
  var findStorageKey = function(entity){
    // use a model's urlRoot value
    if(entity.urlRoot){
      return _.result(entity, "urlRoot");
    }
    // use a collection's url value
    if(entity.url){
      return _.result(entity, "url");
    }

    throw new Error("Unable to determine storage key");
  };

  var storageCache = {};
  var getStorage = function(key){
    var storage = storageCache[key];
    if(storage){
      return storage;
    }
    var newStorage = new Backbone.LocalStorage(key);
    storageCache[key] = newStorage;
    return newStorage;
  }

  var StorageMixin = function(entityPrototype){
    var storageKey = findStorageKey(entityPrototype);
    return { localStorage: getStorage(storageKey) };
  };

  var configureStorage = function(constructor){
    constructor.prototype.localStorage = StorageMixin(constructor.prototype).localStorage;
  };

  return configureStorage;
});
