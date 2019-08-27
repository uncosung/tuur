import React, { Component } from 'react';
import ReactMapGL, { Popup, Marker, GeolocateControl, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TOKEN from './mapbox-token';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { withStyles } from '@material-ui/core/styles';
import TuurPin from './tuur-pin';
import PopupInfo from './popup-info';
import queryString from 'query-string';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  mapContainer: {
    top: 0,
    position: 'relative',
    width: '100%',
    height: '100%'
  }
});

class Mapbox extends Component {
  constructor(props) {
    super(props);
    const coordinates = queryString.parse(this.props.history.location.search).coordinates.split(' ');
    this.state = {
      viewport: {
        width: '100%',
        height: '667px',
        longitude: parseFloat(coordinates[0]),
        latitude: parseFloat(coordinates[1]),
        zoom: 12
      },
      searchResultLayer: null,
      result: {
        latitude: null,
        longitude: null
      },
      tuurs: [],
      filteredTuurs: [],
      fetchResult: null,
      fetchCoordinates: [],
      // initialCoordinates: [this.props.location.coordinates[0], this.props.location.coordinates[1]],
      popupInfo: null,
      locationQueryStringUrl: this.props.history.location.search

    };
    this.mapRef = React.createRef();
    this.handleViewPortChange = this.handleViewPortChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.filterTuurs = this.filterTuurs.bind(this);
    this.clickPin = this.clickPin.bind(this);
    this.fetchPackages = this.fetchPackages.bind(this);
  }

  componentDidMount() {
    this.fetchPackages();
  }

  componentDidUpdate(prevProps) {
    const currentUrl = this.props.history.location.search.replace(/ /g, '%20');
    const stateQueryUrl = this.state.locationQueryStringUrl.replace(/ /g, '%20');
    if (currentUrl !== stateQueryUrl) {
      return this.fetchPackages();
    }
  }

  fetchPackages() {
    fetch('/api/package.php')
      .then(res => res.json())
      .then(tuurs => {
        this.setState({
          tuurs: tuurs,
          locationQueryStringUrl: this.props.history.location.search
        }, this.fetchLocation);
      });
  }

  fetchLocation() {
    const locationQueryString = queryString.parse(this.props.history.location.search);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQueryString.location}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchResult: result
        }, this.mapTuurs);
      });
  }

  mapTuurs() {
    let mapArray = this.state.tuurs.map(this.getTuurLocationData);
    Promise.all(mapArray).then(tuurCoordinates => {
      this.setState({
        fetchCoordinates: tuurCoordinates
      }, this.filterTuurs);
    });
  }

  async getTuurLocationData(tuur) {
    const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${TOKEN}`);
    const respJson = await resp.json();
    return {
      tuur,
      coord: respJson.features[0].center
    };
  }

  filterTuurs() {
    const locationQueryString = queryString.parse(this.props.history.location.search);
    const coordinates = locationQueryString.coordinates.split(' ');
    let filterTuurs = [];
    let tooFar = [];

    for (let i = 0; i < this.state.fetchCoordinates.length; i++) {
      if (this.state.fetchCoordinates[i].coord[0] < parseFloat(coordinates[0]) - 1 || this.state.fetchCoordinates[i].coord[0] > parseFloat(coordinates[0]) + 1 || this.state.fetchCoordinates[i].coord[1] < parseFloat(coordinates[1]) - 0.2 || this.state.fetchCoordinates[i].coord[1] > parseFloat(coordinates[1]) + 0.2) {
        tooFar = [...tooFar, this.state.fetchCoordinates[i]];
      } else {
        filterTuurs = [...filterTuurs, this.state.fetchCoordinates[i]];
      }
    }
    this.setState({
      filteredTuurs: filterTuurs
    }, () => {
      this.filterTags();
    });
  }

  filterTags() {
    const locationQueryUrl = queryString.parse(this.props.history.location.search);
    let tags = [];
    let dates = {};
    if (locationQueryUrl.tags) {
      tags = locationQueryUrl.tags.split(' ');
    }
    if (locationQueryUrl.dates) {
      dates = locationQueryUrl.dates.split(' ');
      dates.start = dates[0];
      dates.end = dates[1];
    }

    if (!tags.length && dates.start) {
      this.filterDates(dates.start, dates.end);
      return;
    }
    if (tags.length) {
      let tagArray = [];
      for (let i = 0; i < this.state.filteredTuurs.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          for (let k = 0; k < JSON.parse(this.state.filteredTuurs[i].tuur.tags).length; k++) {
            if (JSON.parse(this.state.filteredTuurs[i].tuur.tags)[k] === tags[j]) {
              tagArray = [...tagArray, this.state.filteredTuurs[i]];
            }
          }
        }
      }
      for (let h = 0; h < tagArray.length; h++) {
        for (let g = h + 1; g < tagArray.length; g++) {
          if (tagArray[h] === tagArray[g]) {
            tagArray.splice(g, 1);
          }
        }
      }

      this.setState({
        filteredTuurs: tagArray
      }, () => {
        if (dates.start) return this.filterDates(dates.start, dates.end);
      });
    }
  }

  filterDates(start, end) {
    const endDate = new Date(end);
    const begDate = new Date(start);
    let begDateYear = begDate.getFullYear();
    let begDateMonth = begDate.getMonth() + 1;
    let begDateDay = begDate.getDate();
    const endDateYear = endDate.getFullYear();
    const endDateMonth = endDate.getMonth() + 1;
    const endDateDay = endDate.getDate();
    let dateArray = [];
    let availablePackage = [];
    let availableTuur = [];
    dateArray.push(new Date(begDateYear, begDateMonth, begDateDay));
    while (begDateMonth !== endDateMonth || begDateDay !== endDateDay) {
      if (begDateDay === 1) {
        begDateMonth = begDateMonth === 11 ? 0 : ++begDateMonth;
      }
      if (begDateMonth === 0 && begDateDay === 1) {
        begDateYear = begDateMonth === 1 ? ++begDateYear : begDateYear;
      }
      availableTuur = this.checkAvailability(begDateYear, begDateMonth, begDateDay);
      begDateDay = this.nextDay(begDateMonth, begDateDay);
      if (availableTuur) {
        availablePackage.push(availableTuur);
      }
    }

    if (begDateMonth === endDateMonth && begDateDay === endDateDay) {
      availableTuur = this.checkAvailability(begDateYear, begDateMonth, begDateDay);
      if (availableTuur) {
        availablePackage.push(availableTuur);
      }
    }

    this.setState({
      filteredTuurs: availablePackage
    });
  }

  checkAvailability(year, month, day) {
    for (let i = 0; i < this.state.filteredTuurs.length; i++) {
      let parseDate = JSON.parse(this.state.filteredTuurs[i].tuur.dates);
      for (var value of parseDate) {
        const packageDate = new Date(value);
        const packageYear = packageDate.getFullYear();
        const packageMonth = packageDate.getMonth();
        const packageDay = packageDate.getDate();
        if (packageYear === year && packageMonth === month && packageDay === day) {
          return this.state.filteredTuurs[i];
        }
      }
    }
  }

  nextDay(month, day) {
    // last day of month = 31
    if (month === 0 && day != 31) return ++day;
    // last day of month = 28
    if (month === 1 && day !== 28) return ++day;
    // last day of month = 31
    if (month === 2 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 3 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 4 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 5 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 6 && day !== 31) return ++day;
    // last day of month = 31
    if (month === 7 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 8 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 9 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 10 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 11 && day !== 31) return ++day;
    return 1;
  }

  handleViewPortChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
      result: {
        latitude: viewport.latitude,
        longitude: viewport.longitude
      }
    }, this.filterTuurs);
  }

  clickPin(tuur) {
  }

  renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor='top'
          longitude={popupInfo.coord[0]}
          latitude={popupInfo.coord[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PopupInfo path={this.props.path} info={popupInfo.tuur}/>
        </Popup>
      )
    );
  }

  render() {
    const { classes } = this.props;
    const markerMap = this.state.filteredTuurs.map((marker, index) => {
      return (
        <Marker onClick={this.clickPin} key={index} latitude={marker.coord[1]} longitude={marker.coord[0]}>
          <TuurPin tuur={marker} onClick={() => this.setState({ popupInfo: marker }) } size={20} />
        </Marker>
      );
    });
    const { viewport } = this.state;
    return (
      <div className={classes.mapContainer}>
        <ReactMapGL
          ref = {this.mapRef}
          {...viewport}
          onViewportChange= {this.handleViewPortChange}
          mapboxApiAccessToken = {TOKEN}
          transitionInterpolator = {new FlyToInterpolator()}
          mapStyle = 'mapbox://styles/mapbox/streets-v11'
        >
          {markerMap}
          {this.renderPopup()}
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

export default withRouter(withStyles(styles)(Mapbox));
