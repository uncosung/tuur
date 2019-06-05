import React, {Component} from 'react';
import ReactMapGL, {Marker, GeolocateControl, FlyToInterpolator, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactGeocoder from 'react-map-gl-geocoder';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const token = 'pk.eyJ1IjoidW5jb3N1bmciLCJhIjoiY2p3aWRvZ2t4MDFjNjRhcGVpZ2pmN3JvMCJ9.z82fIIUAciGedjhFaXAfqA'
class Mapbox extends Component {
    constructor (props) {
        super(props);
        this.state = {
            viewport:{
                width: 325,
                height: 325,
                latitude: 35.68,
                longitude: 139.77,
                zoom: 12
            },
            searchResultLayer: null,
            result: {
                latitude: null,
                longitude: null
            },
            tuurs: [
                {
                    type: 'Feature',
                    properties: {
                        title: 'Los Angeles, CA',
                        description: 'A northside park that is home to the Lincoln Park Zoo'
                    },
                    geometry: {
                        coordinates: [
                            
                        ],
                        type: 'Point'
                    },
                    
                },
                {
                    type: 'Feature',
                    properties: {
                        title: 'Burnham Park, Illinois',
                        description: "A lakefront park on Chicago's south side"
                    },
                    geometry: {
                        coordinates: [
                            -87.603735,
                            41.829985
                        ],
                        type: 'Point'
                    },
                    
                }
            ],
            fetchResult: null

        }
        this.mapRef = React.createRef();
        this.handleViewPortChange = this.handleViewPortChange.bind(this);
        this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(this);
        this.handleOnResult = this.handleOnResult.bind(this);
        this.forwardGeocoder = this.forwardGeocoder.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchLocation = this.fetchLocation.bind(this);

    }
    componentDidMount(){
        this.fetchLocation();
        // const mapTuurs = this.state.tuurs.map(tuur => {
        //     console.log(tuur);
        //     return 
        // })
        // console.log(mapTuurs);
    }
    fetchLocation() {
        console.log(this.state)
        const tuur = this.state.tuurs[0].properties.title
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur}.json?access_token=${token}`)
            .then(res => res.json())
            .then((result) => {
                this.setState ({
                    fetchResult: result
                }, () => console.log('yoyo', result))
                
            })
    }
    forwardGeocoder (query) {
        let matchingFeatures = [];
        for (let i = 0; i < this.state.tuurs.length; i++){
            let feature = this.state.tuurs[i];
            if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
                feature['place_name'] = '🌲 ' + feature.properties.title;
                feature['center'] = feature.geometry.coordinates;
                feature['place_type'] = ['park'];
                matchingFeatures.push(feature);
                }
        }
        console.log(matchingFeatures)
        return matchingFeatures
    }
    handleViewPortChange (viewport) {
        this.setState ({
            viewport: { ...this.state.viewport, ...viewport},
            result: {
                latitude: viewport.latitude,
                longitude: viewport.longitude
            }
        });
    };
    handleGeocoderViewportChange (viewport) {
        return this.handleViewPortChange({
            ...viewport
        });
    };
    handleOnResult (event) {
        console.log(event);
        this.setState ({
            searchResultLayer: new GeoJsonLayer({
                id: 'search-result',
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            }) ,
            result: {
                latitude: event.result.center[1],
                longitude: event.result.center[0]
            }
        })
    }
    
    render () {
        
        const {viewport, searchResultLayer} = this.state;
        return (
            <div style = {{ height: '100vh' }}>
                <ReactMapGL
                    ref = {this.mapRef}
                    {...viewport}
                    onViewportChange= {this.handleViewPortChange}
                    mapboxApiAccessToken = {token}
                    transitionInterpolator = {new FlyToInterpolator()}
                >
                    <ReactGeocoder
                        mapRef = {this.mapRef}
                        onResult = {this.handleOnResult}
                        onViewportChange = {this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={token}
                        position = 'top-left'
                        localGeocoder = {this.forwardGeocoder}
                    />
                    <Marker latitude = {37.7577} longitude = {-122.4376} offsetLeft = {-20} offsetTop = {-10}>
                        <div></div>
                    </Marker>
                    <DeckGL {...viewport} layers={[searchResultLayer]} />
                    
                    <div style={{position: 'absolute', bottom: 50, right: 10}}>
                        <NavigationControl/>
                    </div>
                    <div style={{position: 'absolute', bottom: 50, left: 10}}>
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
export default Mapbox;