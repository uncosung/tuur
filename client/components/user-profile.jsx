import React, { Component } from 'react';
import UpComingTuursList from './user-upcoming-tuurs-list';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Route, Redirect } from 'react-router-dom';

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
    this.state = {
      name: '',
      location: '',
      image: '',
      isGuide: undefined,
      auth: ''
    };
  }

  componentDidMount() {

    let email = this.props.match.params.email;
    if (!email) {
      email = '';
    } else {
      email = this.props.user.email;
    }
    fetch(`/api/profile.php?email=${email}`)
      // .then(res => console.log(res));
      .then(res => res.json())
      .then(response => {
        console.log(response);
        this.setState({
          name: response.name,
          location: response.location,
          image: response.image,
          isGuide: response.isGuide,
          auth: response.auth
        });
      });
  }


  render() {
    const { classes } = this.props;
    const newUser = this.props.history.location.state.user.user;
    const newUser2 = this.props.user;
    console.log('newUser',newUser, 'newUser2', newUser2)
    console.log('in render state', this.state, 'props', this.props, 'new', newUser);
    return (
      <>
      <Container className={classes.marginBottom} >
        <Typography className={classes.marginTop} variant="h4">
          {newUser ? newUser.name : newUser2.name }
        </Typography>
        <Typography className={classes.marginLeft} variant="subtitle1">
          {newUser ? newUser.location : newUser2.location}
        </Typography>
      </Container>
      <Container>
        <Grid className={classes.marginBottom} container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={4}>
            <Avatar alt="avatar" src={newUser ? newUser.image : newUser2.image} className={classes.avatar} />
          </Grid>
          <Grid item xs={6}>
            <Button type="button" fullWidth variant="contained" color="primary" onClick={() => this.props.view(null, newUser.user ? newUser : newUser2, null)} >
              <Typography variant="button">Edit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>

      {this.state.isGuide
        ? <UpComingTuursList view={this.props.view} user={ newUser }/>
        : <Typography variant="h5">No Tuurs available</Typography>
      }
      </>
    );
  }
}

export default withStyles(styles)(UserProfile);
