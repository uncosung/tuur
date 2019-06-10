import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SearchPackageItem from './search-result-package-item';
import TOKEN from './mapbox-token';


const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
});

class SearchPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      fetchResult: null,
      fetchCoordinates: [],
      filteredTuurs: []
    };
  }

  componentDidMount() {
    console.log('mounted', this.props)

    fetch('/api/package.php')
      .then(res => res.json())
      .then(packages => this.setState({ packages }, this.fetchLocation));
  }

  renderPackage() {
    const packages = this.state.filteredTuurs.map((item, id) => {
      console.log('finding details', item, id)
      return <SearchPackageItem key={id} item={ item.tuur } />;
    });
    return packages;
  }
  async getTuurLocationData(tuur) {
    const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${TOKEN}`);
    const respJson = await resp.json();
    return {
      tuur,
      coord: respJson.features[0].center
    };
  }
  mapTuurs() {
    let mapArray = this.state.packages.map(this.getTuurLocationData);

    Promise.all(mapArray).then(tuurCoordinates => {
      this.setState({
        fetchCoordinates: tuurCoordinates
      }, this.filterTuurs);
    });

  }
  fetchLocation() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.name}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchResult: result
        }, this.mapTuurs);
      });

  }
  filterTuurs() {
    console.log('filtering', this.state)
    let filterTuurs = [];
    let tooFar = [];
    for (let i = 0; i < this.state.fetchCoordinates.length; i++) {
      if (this.state.fetchCoordinates[i].coord[0] < this.props.location.coordinates[0] - 1 || this.state.fetchCoordinates[i].coord[0] > this.props.location.coordinates[0] + 1 || this.state.fetchCoordinates[i].coord[1] < this.props.location.coordinates[1] - 0.2 || this.state.fetchCoordinates[i].coord[1] > this.props.location.coordinates[1] + 0.2) {
        tooFar = [...tooFar, this.state.fetchCoordinates[i]];
      } else {
        filterTuurs = [...filterTuurs, this.state.fetchCoordinates[i]];
      }
    }
    this.setState({
      filteredTuurs: filterTuurs
    }, () => console.log('filtered!', this.state.filteredTuurs));

  }

  render() {
    const { classes } = this.props;
    return (
      <>
          <Container className={classes.marginBottom} >
            <Typography className={classes.marginTop} variant="h5">
              Tuurs
            </Typography>
          </Container>
          { this.state.packages ? this.renderPackage() : 'No available packages'}
      </>
    );
  }
}

export default withStyles(styles)(SearchPackages);
