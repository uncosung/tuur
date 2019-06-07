import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CardTravel from '@material-ui/icons/CardTravel';
import Message from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserProfile from './user-profile';
import UpComingTuursList from './user-upcoming-tuurs-list';
import Search from './search';
import Itinerary from './itinerary';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: 10
  }
});

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value, pathMap } = this.state;
    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<Home />} component={Link} to={'/results'} />
        {/* <BottomNavigationAction label="Favorites" icon={<FavoriteBorder />} component={Link} to={pathMap[1]} /> */}
        <BottomNavigationAction label="Itinerary" icon={<CardTravel />} component={Link} to={'/itinerary'} />
        {/* <BottomNavigationAction label="Message" icon={<Message />} component={Link} to={pathMap[3]} /> */}
        <BottomNavigationAction label="Account" icon={<AccountCircle />} component={Link} to={'/user-profile'} />
      </BottomNavigation>
    );
  }

}

export default withStyles(styles)(BottomNav);
