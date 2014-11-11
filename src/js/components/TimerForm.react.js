var React = require('react');
var Actions = require('../actions/AppActions');

function defaultVal(){
    return {description: ''};
}

var TimerForm = React.createClass({
    getInitialState: function() {
        return defaultVal();
    },
    render: function() {
      return (
            <form onSubmit={this.submit} className="form">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" onChange={this.onChange} value={this.state.description} required/>
                <input type="submit" value="add timer"/>
            </form>
      );
    },
    onChange: function(e) {
        this.setState({description: e.target.value});
    },
    submit: function (e){
        e.preventDefault();
        Actions.add(this.state.description);
        this.setState(defaultVal());
    }
});

module.exports = TimerForm;
