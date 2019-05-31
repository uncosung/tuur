import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CardTravel from '@material-ui/icons/CardTravel';
import Message from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';

// const useStyles = makeStyles({
//
// });

function BottomNav() {
  // const classes = useStyles();

  return (
    <BottomNavigation showLabels >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteBorder />} />
      <BottomNavigationAction label="Itinerary" icon={<CardTravel />} />
      <BottomNavigationAction label="Message" icon={<Message />} />
      <BottomNavigationAction label="Account" icon={<AccountCircle />} />
    </BottomNavigation>
  );
}

export default BottomNav;
