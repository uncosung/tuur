
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UpComingTuurItem from './user-upcoming-tuurs-list-item';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  cardContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    padding: 10,
    width: '40rem'
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  }
});

function UpComingTuursList(props) {

  const { classes } = props;
  return (
      <>
       <Container className={classes.marginBottom} >
         <Typography className={classes.marginTop} variant="h4">
        Upcoming Tuurs
         </Typography>
       </Container>

        <UpComingTuurItem />
      </>
  );
}

export default withStyles(styles)(UpComingTuursList);
