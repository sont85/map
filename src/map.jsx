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
  var location = new google.maps.LatLng(this.props.lat, this.props.lng);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 13,
    scrollwheel: false
  });
  var centerMarker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'target'
  });
},
  render: function() {
    return <div id='map'></div>;
  }
});
