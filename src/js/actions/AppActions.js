var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Actions = {
  start: function(timer) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.START,
      timer: timer
    });
  },
  stop: function(timer) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.STOP,
      timer: timer
    });
  },
  add: function(description){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD,
      description: description
    });
  },
  remove: function(guid){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE,
      guid: guid
    });
  }
};

module.exports = Actions;