var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var utils = require('../polyfill/object-assign');

var CHANGE_EVENT = 'change';
var STORAGE_NAME = 'timers';

if(!localStorage.getItem(STORAGE_NAME))
    localStorage.setItem(STORAGE_NAME, JSON.stringify({timers:[]}));

var _timers = JSON.parse(localStorage.getItem(STORAGE_NAME));
var _interval;

function guid(){
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);
    });
}

function tick(){
    this.elapsed++;
    AppStore.emitChange();
}

function stop(timer){
    if(timer.isRunning){
        timer.isRunning = false;
        timer.data[timer.data.length - 1].end = new Date();
    }
}

function start(timer){
    if(!timer.isRunning){
        timer.isRunning = true;
        timer.data.push({start: new Date(), end: null});
    }
}

var AppStore = Object.assign(EventEmitter.prototype, {
    emitChange:function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    getTimers: function(){
        return _timers;
    },
    save: function(){
        _timers.timers.forEach(stop);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(_timers));
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
            case AppConstants.START:
                _timers.timers.forEach(stop);

                if(_interval)
                    clearInterval(_interval);

                start(action.timer);
                _interval = setInterval(tick.bind(action.timer), 1000);
            break;
            case AppConstants.STOP:
                stop(action.timer);
                clearInterval(_interval);
            break;
            case AppConstants.ADD:
                var timer = {
                    description: action.description,
                    guid: guid(),
                    elapsed: 0,
                    isRunning: false,
                    data: []
                };

                _timers.timers.push(timer);
            break;
            case AppConstants.REMOVE:
                _timers.timers = _timers.timers.filter(function(timer){
                    return timer.guid !== action.guid;
                });
            break;
            default:
                throw "Action not known";
        }

        AppStore.emitChange();
        return true;
    })
});

module.exports = AppStore;