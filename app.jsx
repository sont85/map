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
      return {
        favorites: [],
        currentAddress: 'Paris, France',
        mapCoordinates: {
          lat: 48.856614,
          lng: 2.3522219
        }
      };
    },
    searchForAddress: function(address) {
      GMaps.geocode({
        address: address,
        callback: (function(results, status) {
          console.log(results);
          if (status != 'OK')
            return;
          var latlng = results[0].geometry.location;
          this.setState({
            currentAddress: results[0].formatted_address,
            mapCoordinates: {
              lat: latlng.lat(),
              lng: latlng.lng()
            }
          }, this.refs.map.mapping);
        }).bind(this)
      });
    },
    render: function() {
      return <div><Header/>
          <section>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-6'>
                  <Search onSearch={this.searchForAddress}/>
                </div>
                <div className='col-sm-6'>
                  <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} ref='map'/>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
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
      return <div id='map'></div>;
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
      this.props
        .onSearch(this.state.text);
    },
    render: function() {
      return <div id='dashboard'>
          <form className='input-group' onSubmit={this.handleSubmit}>
            <input className='form-control' onChange={this.handleChange} placeholder='city, country'/>
            <span className='input-group-btn'>
              <button className='btn btn-default' type='submit'>Look Up</button>
            </span>
          </form>
        </div>;
    }
  });
  var Locations = React.createClass({
    render: function() {
      return <div>
        <ul>{this.props.data.map(function(item){
            return <li>
              <h5>{item.address}</h5>
              <h5>{item}</h5>
            </li>
          })}
        </ul>
      </div>
    }
  })

  React.render(<App/>, document.getElementById('root'));
})();
