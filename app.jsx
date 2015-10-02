(function() {
  'use strict';
  var Header = React.createClass({
    render: function() {
      return <header>
          <div className='overlay'>
            <div className='container'>
              <h1 className='text-center title'>Google Maps Location</h1>
              <h5 className='text-center subtitle'>Saved Up To Three Locations On Google Maps</h5>
            </div>
          </div>
        </header>;
    }
  });
  var Footer = React.createClass({
    render: function() {
      return <footer>
        <div className='overlay'>
          <div className='container'>
            <h4 className='text-center title'>&copy; 2015 Luckycode.org | by Son Truong</h4>
          </div>
        </div>
      </footer>;
    }
  });

  var App = React.createClass({
    getInitialState: function() {
      var favorites = JSON.parse(localStorage.getItem('coordinates'));
      return {
  			favorites: favorites,
  			currentAddress: favorites[0].address,
  			mapCoordinates: {
  				lat: favorites[0].H ,
  				lng: favorites[0].L
  			}
  		};
    },
    ComponentWillMount: function() {

    },
    searchForAddress: function(address) {
      var self = this;
      GMaps.geocode({
        address: address,
        callback: function(results, status) {
          console.log(results);
          if (status != 'OK') return;
          var latlng =results[0].geometry.location;
          latlng.address = results[0].formatted_address;
          self.saveLocation(latlng);
          self.setState({
            currentAddress: latlng.address,
            mapCoordinates: {
              lat: latlng.lat(),
              lng: latlng.lng()
            }
          }, self.refs.map.mapping);
        }
      });
    },
    saveLocation: function(latlng) {
      var storage = localStorage.getItem('coordinates');
      if (storage) {
        var coordinates = JSON.parse(storage);
        coordinates.unshift(latlng);
        localStorage.setItem('coordinates', JSON.stringify(coordinates));
      } else {
        localStorage.setItem('coordinates', JSON.stringify([latlng]));
      }
    },
    render: function() {
      return <div><Header />
          <section>
            <div className='container'>
              <Search onSearch={this.searchForAddress}/>
              <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} ref='map' />
            </div>
          </section>
          <Footer />
        </div>;
    }
  });

  var Map = React.createClass({
    componentDidMount: function() {
      this.mapping();
    },
    mapping: function() {
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
      return <div id='map'>
        </div>;
    }
  });

  var Search = React.createClass({
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
    },
    render: function() {
      return <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder='city, country'/>
          <button className='btn btn-default' type='submit'>Look Up</button>
        </form>
      </div>;
    }
  });

  React.render(<App/>, document.getElementById('root'));
})();
