import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  }
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    console.log('clicked');
  }
  render() {
    const { classes } = this.props;
    return (
      <>
      <Container className={classes.marginBottom} >
        <Typography className={classes.marginTop} variant="h4">
        John Doe
        </Typography>
        <Typography className={classes.marginLeft} variant="subtitle1">
        Los Angels, CA
        </Typography>
      </Container>
      <Container>
        <Grid className={classes.marginBottom} container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={4}>
            <Avatar alt="avatar" src={'https://s3.amazonaws.com/kairos-media/team/Ben_Virdee-Chapman.jpeg'} className={classes.avatar} />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.handleSubmit} >
              <Typography variant="button">Edit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
      </>
    );
  }
}

export default withStyles(styles)(UserProfile);
