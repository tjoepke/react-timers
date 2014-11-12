var React = require('react/addons');
var Actions = require('../actions/AppActions');
var Store = require('../stores/AppStore');


function fixLeadingZeros(value){
    if(value === null)
        return '';

    return value < 10 ? "0" + value : value;
}

function formatTime(value){
    if(value === null)
        return '';

    var hours = parseInt(value / 3600) % 24;
    var minutes = parseInt(value / 60 ) % 60;
    var seconds = value % 60;

    return fixLeadingZeros(hours) + ":" + fixLeadingZeros(minutes) + ":" + fixLeadingZeros(seconds);
}

function formatDate(value){
    if(value === null)
        return '';

    return fixLeadingZeros(value.getDate()) + "/" + fixLeadingZeros(value.getMonth() + 1) + "/" + value.getFullYear() + ' '
                + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
}

var Timer = React.createClass({
    getInitialState: function(){
        return {detailsVisible: false};
    },
    render: function() {
        var classes = React.addons.classSet({
            'timer': true,
            'timer-running': this.props.timer.isRunning
        });

        var rows = this.props.timer.data.map(function(r){
            var from = new Date(r.start);
            var till = r.end ? new Date(r.end) : null;
            var duration = till ? Math.floor((till - from)/1000) : null;

            return (<tr>
                            <td>{formatDate(from)}</td>
                            <td>{formatDate(till)}</td>
                            <td>{formatTime(duration)}</td>
                    </tr>);
        });

        var showhideText = this.state.detailsVisible ? 'hide' : 'show';
        return (
            <div onClick={this.toggle} className={classes}>
                <span className="timer-elapsed">{formatTime(this.props.timer.elapsed)}</span>
                <span className="timer-description">{this.props.timer.description}</span>
                <span className="timer-button" onClick={this.remove}>remove</span>
                <span className="timer-button" onClick={this.toggleDetails}>{showhideText}</span>

                { this.state.detailsVisible
                    ?  <table>
                        <thead>
                            <tr>
                             <th>From</th>
                             <th>Till</th>
                             <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    : null }

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
    },
    toggleDetails: function(e){
        e.stopPropagation();
        this.setState({detailsVisible: !this.state.detailsVisible});
    }
});

module.exports = Timer;