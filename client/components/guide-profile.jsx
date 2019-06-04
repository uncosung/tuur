import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  margin: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginTop2: {
    marginTop: theme.spacing(60)
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

class GuideProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    // console.log('clicked');
  }

  componentDidMount() {
    const email = 'dPaschal@gmail.com';
    fetch(`api/profile.php?email=${email}`)
      .then(res => res.json())
      .then(response => this.setState({
        name: response.name,
        location: response.location,
        image: response.image
      }));
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <Container className={classes.marginBottom} >
        <Typography className={classes.marginTop} variant="h4">
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
            <Button type="submit" fullWidth variant="contained" color="primary" onClick={() => this.props.view('editProfile')} >
              <Typography variant="button">Edit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Grid justify="center" className={classes.margin} container>
        <Grid className={classes.marginTop2} container justify="center" >
          <ThemeProvider theme={theme}>
            <Button type="submit" className={classes.margin} fullWidth variant="contained" color="primary" onClick={() => this.props.view('createPackage')}>
              <Typography variant="body1" gutterBottom>Create Package</Typography>
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
      </>
    );
  }
}

export default withStyles(styles)(GuideProfile);
