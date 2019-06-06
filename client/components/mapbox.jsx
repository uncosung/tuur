import React, { Component } from 'react';
import ReactMapGL, { Marker, GeolocateControl, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TOKEN from './mapbox-token';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactGeocoder from 'react-map-gl-geocoder';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import SearchBar from './search-bar';
import { withStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const styles = theme => ({
  mapContainer: {
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '100%',
        height: '705px',
        latitude: this.props.location.coordinates[1],
        longitude: this.props.location.coordinates[0],
        zoom: 12
      },
      searchResultLayer: null,
      result: {
        latitude: null,
        longitude: null
      },
      tuurs: [],
      fetchResult: null,
      fetchCoordinates: []

    };
    this.mapRef = React.createRef();
    this.handleViewPortChange = this.handleViewPortChange.bind(this);
    this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(this);
    this.handleOnResult = this.handleOnResult.bind(this);
    this.forwardGeocoder = this.forwardGeocoder.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }
  componentDidMount() {
    fetch('/api/package.php?id=1')
      .then(res => res.json())
      .then(tuurs => {
        this.setState({
          tuurs: tuurs
        }, this.fetchLocation);
      });
  }
  fetchLocation() {
    this.state.tuurs.map(tuur => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${TOKEN}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            fetchCoordinates: [...this.state.fetchCoordinates, [tuur, result.features[0].center]]
          }, console.log('center error', result));
        });
    });
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.name}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchResult: result
        });

      });

  }
  handleSearch(location) {
    console.log(location);
    this.setState({
      viewport: {
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        width: '100%',
        height: '705px',
        zoom: 12
      }
    });
  }
  forwardGeocoder(query) {
    let matchingFeatures = [];
    for (let i = 0; i < this.state.tuurs.length; i++) {
      let feature = this.state.tuurs[i];
      if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
        feature['place_name'] = '🌲 ' + feature.properties.title;
        feature['center'] = feature.geometry.coordinates;
        feature['place_type'] = ['park'];
        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }
  handleViewPortChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
      result: {
        latitude: viewport.latitude,
        longitude: viewport.longitude
      }
    });
  }
  handleGeocoderViewportChange(viewport) {
    return this.handleViewPortChange({
      ...viewport
    });

  }
  handleOnResult(event) {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      }),
      result: {
        latitude: event.result.center[1],
        longitude: event.result.center[0]
      }
    });
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);
    const markerMap = this.state.fetchCoordinates.map(marker => {
      return (
        <Marker key={marker[0].id} latitude={marker[1][1]} longitude={marker[1][0]}>
          <div>{marker[0].title}</div>
        </Marker>
      );
    });
    const { viewport, searchResultLayer } = this.state;
    return (
      <div className={classes.mapContainer}>
        <SearchBar handleGeocoderViewportChange={this.handleGeocoderViewportChange} handleOnResult={this.handleOnResult} handleSearch={this.handleSearch} mapRef={this.state.mapRef} view={this.props.view} user={this.props.user} location={this.props.location}/>
        <ReactMapGL
          ref = {this.mapRef}
          {...viewport}
          onViewportChange= {this.handleViewPortChange}
          mapboxApiAccessToken = {TOKEN}
          transitionInterpolator = {new FlyToInterpolator()}
        >
          {markerMap}
          <DeckGL {...viewport} layers={[searchResultLayer]} />

          <div style={{ position: 'absolute', bottom: 50, right: 10 }} >
            <NavigationControl/>
          </div>
          <div style={{ position: 'absolute', bottom: 50, left: 10 }}>
            <GeolocateControl
              positionOptions = {{
                enableHighAccuracy: true
              }}
              trackUserLocation = {true}
            >
            </GeolocateControl>
          </div>
        </ReactMapGL>

      </div>
    );
  }
}

export default withStyles(styles)(Mapbox);
