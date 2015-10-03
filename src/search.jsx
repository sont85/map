var Search = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      text: null
    };
  },
  handleChange: function(e) {
    this.setState({
      text: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSearch(this.state.text);
    this.setState({ text: ""});
  },
  render: function() {
    return <div id='dashboard'>
        <form className='input-group' onSubmit={this.handleSubmit}>
          <input className='form-control' onChange={this.handleChange} placeholder='city, country' value={this.state.text} />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>Look Up</button>
          </span>
        </form>
      </div>;
  }
});
