import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

import ItineraryItem from './itinerary-package-item';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // expanded: false,
      packages: []
    };

  }

  packageCondition() {
    const packageArray = this.state.packages.map((item, id) => {
      if (typeof item.dates === 'string') {
        const date = item.dates.replace(/[^a-zA-Z0-9-_.,:]/g, '');
        let dateArray = date.split(',');
        dateArray.sort();
        dateArray = this.dateCompleted(dateArray);
        item.dates = dateArray;
      }

      item.dates = this.dateCompleted(item.dates);
      return <ItineraryItem key={id} item={item} />;
    });
    return packageArray;
  }

  dateCompleted(date) {
    const currentDate = new Date();
    const firstBookDate = new Date(date[0]);
    // If booked date passed, remove date and return new array
    if (currentDate > firstBookDate) {
      date.splice(0, 1);
    }
    return date;
  }

  componentDidMount(){
    fetch('/api/booking.php?email')
      .then( res => res.json() )
      .then( packages => this.setState( { packages } ))
  }

  componentDidUpdate(){
    if ( this.state.package ){
      fetch('/api/booking.php?email')
      .then( res => res.json() )
      .then( packages => this.setState( { packages } ), () => console.log( 'updatedlkjlkjklj'))
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <Container className={classes.marginBottom}>
        <Typography className={classes.marginTop} variant="h4">
          Booked Tuurs
        </Typography>
      </Container>
      <Container style={{ paddingBottom: '80px' }}>
        {this.state.packages ? this.packageCondition() : null}
      </Container>
      </>
    );
  }
}

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
});

export default withStyles(styles)(Itinerary);
