var React = require('react');
var Store = require('../stores/AppStore');

var Timer = require('../components/Timer.react');
var TimerForm = require('../components/TimerForm.react');

function timers(){
    return Store.getTimers();
}

var Timers = React.createClass({
    getInitialState: function() {
        return timers();
    },
    _onChange:function(){
        this.setState(timers());
    },
    componentWillMount:function(){
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        Store.removeChangeListener(this._onChange);
        Store.stop();
    },
    render: function() {
        var items = this.state.timers.map(function(timer) {
            return <Timer key={timer.guid} timer={timer} />;
        });

        return  (
                    <div onBeforeUnload={this.test} >
                        <TimerForm />
                        {items}
                    </div>
                );
    }
});


window.onbeforeunload = function () {
    Store.save();
};

module.exports = Timers;