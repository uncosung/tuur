import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import CardTravel from '@material-ui/icons/CardTravel';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '10px 0'
  }
});

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    let path = null;
    if (!this.props.user) {
      path = '/login';
    } else {
      path = '/user-view-profile/' + this.props.user.email;
    }
    return (
      <BottomNavigation
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<Home />} component={Link} to={'/results'} />
        <BottomNavigationAction label="Itinerary" icon={<CardTravel />} component={Link} to={'/itinerary'} />
        <BottomNavigationAction label="Account" icon={<AccountCircle />} component={Link} to={path} />
      </BottomNavigation>
    );
  }

}

export default withStyles(styles)(BottomNav);
