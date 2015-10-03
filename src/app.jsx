import React from 'react';
import ReactDOM from 'react-dom';

(function() {
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
      return favorites? {
          favorites: favorites,
          currentAddress: favorites[0].address,
          lat: favorites[0].H,
          lng: favorites[0].L
        } : null;
    },
    searchForAddress: function(address) {
      GMaps.geocode({
        address: address,
        callback: (function(results, status) {
          console.log(results);
          if (status != 'OK')
            return;
          var latlng = results[0].geometry.location;
          latlng.address = results[0].formatted_address;
          this.saveLocation(latlng);
          this.setState({
            currentAddress: latlng.address,
            lat: latlng.lat(),
            lng: latlng.lng()
          });
        }).bind(this)
      });
    },
    saveLocation: function(latlng) {
      var storage = localStorage.getItem('coordinates');
      var coordinates = JSON.parse(storage);
      if (storage) {
        coordinates.unshift(latlng);
        localStorage.setItem('coordinates', JSON.stringify(coordinates));
        this.setState({ favorites: coordinates });
      } else {
        localStorage.setItem('coordinates', JSON.stringify([latlng]));
        this.setState({ favorites: [latlng] });
      }
    },
    render: function() {
      return <div><Header/>
          <section>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-6'>
                  <Search onSearch={this.searchForAddress}/>
                  <Locations data={this.state.favorites}/>
                </div>
                <div className='col-sm-6'>
                  <Map lat={this.state.lat} lng={this.state.lng} />
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>;
    }
  });

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

  React.render(<App/>, document.getElementById('root'));
})();