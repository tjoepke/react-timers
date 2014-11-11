var React = require('react/addons');
var Actions = require('../actions/AppActions');
var Store = require('../stores/AppStore');

var Timer = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'timer': true,
            'timer-running': this.props.timer.isRunning
        });

        var hours = parseInt(this.props.timer.elapsed/3600) % 24;
        var minutes = parseInt( this.props.timer.elapsed / 60 ) % 60;
        var seconds = this.props.timer.elapsed % 60;

        var formatted = (hours < 10 ? "0" + hours : hours) + ":"
                            + (minutes < 10 ? "0" + minutes : minutes) + ":"
                            + (seconds  < 10 ? "0" + seconds : seconds);

        return (
            <div onClick={this.toggle} className={classes}>
                <span className="timer-elapsed">{formatted}</span>
                <span className="timer-description">{this.props.timer.description}</span>
                <span className="timer-remove" onClick={this.remove}>remove</span>
            </div>
        );
    },
    toggle: function(){
        if(this.props.timer.isRunning){
            Actions.stop(this.props.timer);
        }else{
            Actions.start(this.props.timer);
        }
    },
    remove: function(){
        Actions.remove(this.props.timer.guid);
    }
});

module.exports = Timer;