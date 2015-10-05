var Search = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      text: null
    };
  },
  componentDidMount: function() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search'));
    autocomplete.bindTo('bounds', new google.maps.Map(document.getElementById('map')));
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
          <input id='search' className='form-control' onChange={this.handleChange} value={this.state.text} placeholder='city, country' />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>Look Up</button>
          </span>
        </form>
      </div>;
  }
});
