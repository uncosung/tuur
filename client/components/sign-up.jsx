import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Email from '@material-ui/icons/Email';
import LocationOn from '@material-ui/icons/LocationOn';
import Description from '@material-ui/icons/Description';

const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  padding: {
    padding: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    right: 20
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      location: '',
      bio: '',
      isGuide: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handdleToggle = this.handdleToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handdleToggle(event) {
    let isGuide = this.state.isGuide;
    this.setState({ isGuide: !isGuide }, () => console.log(this.state));
  }
  handleSubmit(event) {
    console.log('submit clicked');
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className = "signUp-title-container">
          <h1 className="signUp-title">Sign Up</h1>
        </div>
        <Grid mx="auto" container justify="center">
          <form onSubmit={this.handleSubmit} >
            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField required id="input-name" label="Name" name="name" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <Email />
                </Grid>
                <Grid item>
                  <TextField required id="input-email" label="Email" name="email" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>
            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <LocationOn />
                </Grid>
                <Grid item>
                  <TextField required id="input-location" label="location" name="location" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <Description />
                </Grid>
                <Grid item>
                  <TextField required id="input-shortDescription" label="Description" name="shortDescription" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>

            <FormControlLabel control={
              <Switch checked={this.state.isGuide} onChange={() => this.handdleToggle(event)} value="guide" />} label="Do you want to be a guide?" />
            <Grid className={classes.margin} container justify="center" alignItems="center">
              <Button justify="center" variant="contained" size="medium" color="primary" className={classes.button} onClick={this.handleSubmit}><p>Sign up</p></Button>
            </Grid>

          </form>
        </Grid>
      </>  
    );
  }
}

export default withStyles(styles)(SignUp);
