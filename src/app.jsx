(function() {
  var App = React.createClass({
    getInitialState: function() {
      var favorites = JSON.parse(localStorage.getItem('coordinates'));
      return favorites
        ? {
          favorites : favorites,
          currentAddress : favorites[0].address,
          lat : favorites[0].H,
          lng : favorites[0].L
        }
        : null;
    },
    searchForAddress: function(address) {
      // GMaps.geocode({
      //   address: address,
      //   callback: (function(results, status) {
      //     console.log(results);
      //     if (status != 'OK')
      //       return;
      //     var latlng = results[0].geometry.location;
      //     latlng.address = results[0].formatted_address;
      //     this.saveLocation(latlng);
      //     this.setState({
      //       currentAddress: latlng.address,
      //       lat: latlng.lat(),
      //       lng: latlng.lng()
      //     });
      //   }).bind(this)
      // });

      new google.maps.Geocoder().geocode({ address: address }, (function(results, status) {
        if (status != 'OK') return;
        var latlng = results[0].geometry.location;
        latlng.address = results[0].formatted_address;
        this.saveLocation(latlng);
        this.setState({
          currentAddress: latlng.address,
          lat: latlng.lat(),
          lng: latlng.lng()
        });
      }).bind(this));
    },
    saveLocation: function(latlng) {
      var storage = localStorage.getItem('coordinates');
      var coordinates = JSON.parse(storage);
      if (storage) {
        coordinates.unshift(latlng);
        localStorage.setItem('coordinates', JSON.stringify(coordinates));
        this.setState({
          favorites: coordinates
        });
      } else {
        localStorage.setItem('coordinates', JSON.stringify([latlng]));
        this.setState({
          favorites: [latlng]
        });
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
                  <Map lat={this.state.lat} lng={this.state.lng}/>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>;
    }
  });
  React.render(<App/>, document.getElementById('root'));
})();
