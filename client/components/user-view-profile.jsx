import React, { Component } from 'react';
import UpComingTuursList from './user-upcoming-tuurs-list';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import GuidePackages from './user-view-guide-profile';
import { Link, withRouter } from 'react-router-dom';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';


class UserViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      image: '',
      isGuide: undefined,
      email: '',
      bio: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch('/api/profile.php?id=' + id)
      .then(res => res.json())
      .then(response => {
        this.setState({
          name: response.name,
          location: response.location,
          image: response.image,
          isGuide: response.isGuide,
          email: response.email,
          bio: response.bio
        });
      });
  }

  componentDidUpdate( nextProps ) {
    if (!this.state.name) {
      const email = this.props.match.params.email;
      fetch('/api/profile.php?id=' + id)
        .then(res => res.json())
        .then(response => {
          this.setState({
            name: response.name,
            location: response.location,
            image: response.image,
            isGuide: response.isGuide
          });
        });
    }
  }

  render() {
    const prevUrlPathname = this.props.history.location.state.prevPath.pathname;
    const prevUrlSearch = this.props.history.location.state.prevPath.search
    const { classes } = this.props;
    if (!this.state) return null;
    return (
      <>
      <Container className={classes.marginBottom} >
        <Grid item xs={2} 
          className={classes.paddingRight} 
          name='back' 
          onClick={this.props.history.goBack}
        >
          <KeyboardArrowLeft className={classes.fontSize} />
        </Grid>
        <Typography className={classes.marginTop} style={{ paddingLeft: '16px' }} variant="h4">
          {this.state.name}
        </Typography>
        <Typography className={classes.marginLeft} variant="subtitle1">
          {this.state.location}
        </Typography>
      </Container>
      <Container>
        <Grid className={classes.marginBottom} container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={4}>
            <Avatar alt="avatar" src={this.state.image} className={classes.avatar} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="button">{this.state.bio}</Typography>
          </Grid>
        </Grid>
      </Container>
      <GuidePackages guideInfo={this.state} />
      {/* {this.state.isGuide
        ? <UpComingTuursList view={this.props.view} user={ this.props.user } isGuide={this.state.isGuide}/>
        : <Typography variant="h5">No Tuurs available</Typography>
      } */}
      </>
    );
  }
}

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
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20,
  }
});

export default withRouter(withStyles(styles)(UserViewProfile));
