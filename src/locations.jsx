var Locations = React.createClass({
  PropTypes: {
    data: React.PropTypes.array
  },
  getDefaultProps: function() {
    return { data : [] };
  },
  click: function(e) {
    console.log(e);
  },
  render: function() {
    var self = this;
    return <div>
        <ul>{this.props.data.map( function (item, i) {
          return <li onClick={self.click.bind(null, item)} key={i} >
              <h5>{item.address}</h5>
              <h5>Lat: {item.H}</h5>
              <h5>Long: {item.L}</h5>
            </li>;
          })}
        </ul>
      </div>;
  }
});
