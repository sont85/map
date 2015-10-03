var Map = React.createClass({
  propTypes: {
    lat: React.PropTypes.number,
    lng: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
        lat: 37.7749295,
        lng: -122.41941550000001
    };
  },
  componentDidMount: function() {
    this.componentDidUpdate();
  },
  componentDidUpdate: function() {
    var map = new GMaps({
      el: '#map',
      lat: this.props.lat,
      lng: this.props.lng
    }).addMarker({
      lat: this.props.lat,
      lng: this.props.lng
    });
  },
  render: function() {
    return <div id='map'></div>;
  }
});
