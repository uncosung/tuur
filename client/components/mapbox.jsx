import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TOKEN from './mapboxToken';

// const TOKEN = 'pk.eyJ1IjoidW5jb3N1bmciLCJhIjoiY2p3aWRvZ2t4MDFjNjRhcGVpZ2pmN3JvMCJ9.z82fIIUAciGedjhFaXAfqA';
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }
  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken = {TOKEN}
      >
        <Marker latitude = {37.7577} longitude = {-122.4376} offsetLeft = {-20} offsetTop = {-10}>
          <div>You are here</div>
        </Marker>
      </ReactMapGL>
    );
  }
}
export default Map;
