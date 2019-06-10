import React, { Component } from 'react';
import ItineraryItem from './itinerary-package-item';

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // expanded: false,
      packages: []
    };
    
  }

  packageCondition(){
    const packageArray = this.state.packages.map( (item , id ) => {
      if ( typeof item.dates === 'string'){
        const date = item.dates.replace( /[^a-zA-Z0-9-_.,:]/g,"");
        let dateArray = date.split(',');
        dateArray.sort();
        dateArray = this.dateCompleted( dateArray );
        item.dates = dateArray;
      }
      item = this.dateCompleted( item.dates );
      return <ItineraryItem key={id} item={item} /> 
    })
    return packageArray;
  }

  dateCompleted( date ){
    const currentDate = new Date()
    const firstBookDate = new Date( date[0] );
    // If booked date passed, remove date and return new array
    if ( currentDate > firstBookDate ){
      date.splice( 0 , 1 );
    }
    return date;
  }

  componentDidMount(){
    fetch('/api/booking.php?id')
      .then( res => res.json() )
      .then( packages => this.setState( { packages } ))
  }

  render() {
    return this.state.packages ? this.packageCondition() : null 

  }

}

export default Itinerary;
