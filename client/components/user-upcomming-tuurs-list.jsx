import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UpCommingTuurItem from './user-upcomming-tuurs-list-item';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  }
});

function UpCommingTuursList(props) {

  const { classes } = props;
  return (
      <>
       <Container className={classes.marginBottom} >
         <Typography className={classes.marginTop} variant="h4">
        Upcomming Tuurs
         </Typography>
       </Container>
      <Container className={classes.marginBottom} >

        <Grid className={classes.marginBottom} container
          direction="row"
          justify="center"
          alignItems="center">

          <UpCommingTuurItem />

        </Grid>
      </Container>
      </>
  );
}

export default withStyles(styles)(UpCommingTuursList);
