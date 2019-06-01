import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CardTravel from '@material-ui/icons/CardTravel';
import Message from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  root: {
    width: '90%',
    position: 'fixed',
    bottom: 0,
    padding: 10
  }
});

function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  function handleChange(event, newValue) {
    setValue(newValue);
    console.log('nav clicked', newValue); // newValue is index 0-5
  }

  return (
    <BottomNavigation showLabels value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteBorder />} />
      <BottomNavigationAction label="Itinerary" icon={<CardTravel />} />
      <BottomNavigationAction label="Message" icon={<Message />} />
      <BottomNavigationAction label="Account" icon={<AccountCircle />} />
    </BottomNavigation>
  );
}

export default BottomNav;
