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
      filteredTuurs: [],
      dates: {}
    };
    
    this.fetchPackages = this.fetchPackages.bind(this);
    this.filterDates = this.filterDates.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.filterTuurs = this.filterTuurs.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
  }

  componentDidMount() {
    debugger;
    this.fetchPackages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tags.toString() !== this.props.tags.toString()) {
      this.fetchPackages();
    }
  }

  fetchPackages() {
    fetch('/api/package.php')
      .then(res => res.json())
      .then(packages => this.setState({ packages }, this.fetchLocation));
  }
  
  renderPackage() {
    const packages = this.state.filteredTuurs.map((item, id) => {
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
    }, () => {
      if (this.props.tags.length > 0){
        this.filterTags();
      }
    });

  }
  filterTags () {
    let tagArray = [];
    for (let i = 0; i < this.state.filteredTuurs.length; i++){
      for (let j = 0; j < this.props.tags.length; j++){
        for (let k = 0; k < JSON.parse(this.state.filteredTuurs[i].tuur.tags).length; k++){
          if (JSON.parse(this.state.filteredTuurs[i].tuur.tags)[k] === this.props.tags[j]){
            tagArray = [...tagArray, this.state.filteredTuurs[i]]
          }
        }
      }
    }
    for (let h = 0; h < tagArray.length; h++){
      for (let g = h+1; g < tagArray.length; g++){
        if (tagArray[h] === tagArray[g]){
          tagArray.splice(g, 1)
        }
      }
    }
    if (tagArray.length === 0){
      this.setState({
        filteredTuurs: []
      })
      return
    }
    this.setState ({
      filteredTuurs: tagArray
    }, this.filterDates)
  }
  filterDates () {
    const endDate = new Date( this.props.dates.end );
    const begDate = new Date( this.props.dates.start );
    let begDateYear = begDate.getFullYear();
    let begDateMonth = begDate.getMonth();
    let begDateDay = begDate.getDate();
    const endDateYear = endDate.getFullYear();
    const endDateMonth = endDate.getMonth();
    const endDateDay = endDate.getDate();
    let dateArray = []
    let availablePackage = []
    let availableTuur = [];
    dateArray.push( new Date( begDateYear, begDateMonth, begDateDay));
    while (begDateMonth !== endDateMonth || begDateDay !== endDateDay) {
      begDateDay = this.nextDay(begDateMonth, begDateDay);
      if (begDateDay === 1) {
        begDateMonth = begDateMonth === 11 ? 0 : ++begDateMonth;
      }
      if (begDateMonth === 0 && begDateDay === 1) {
        begDateYear = begDateMonth === 1 ? ++begDateYear : begDateYear;
      }  
      availableTuur = this.checkAvailability(begDateYear, begDateMonth, begDateDay )
      if ( availableTuur ){
        availablePackage.push( availableTuur );
      }
      console.log('date filtered tuurs', availablePackage)
      // dateArray.push(new Date(begDateYear, begDateMonth, begDateDay));
    }

    if ( begDateMonth === endDateMonth && begDateDay === endDateDay){
      availableTuur = this.checkAvailability(begDateYear, begDateMonth, begDateDay )
      if ( availableTuur ){
        availablePackage.push( availableTuur );
      }
    }
    console.log('date filtered tuurs', availablePackage)

    this.setState({
      filteredTuurs: availablePackage
    });
  }

  checkAvailability( year, month, day) {
    for (let i = 0; i < this.state.filteredTuurs.length; i++){
      console.log(this.state.filteredTuurs[i])
      let parseDate = JSON.parse(this.state.filteredTuurs[i].tuur.dates)
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

  
  render() {
    const { classes } = this.props;
    return (
      <>
          <Container className={classes.marginBottom} >
            <Typography className={classes.marginTop} variant="h5">
              Tuurs
            </Typography>
          </Container>
          { this.state.filteredTuurs.length === 0 ? "There are no tuurs that match the search criteria" : this.renderPackage() }
      </>
    );
  }
}

export default withStyles(styles)(SearchPackages);
