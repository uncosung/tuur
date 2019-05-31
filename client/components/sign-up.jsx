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
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '100%'
  },
  title: {
    textAlign: 'center'
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
      isGuide: false,
      inputErrors: {
        name: false,
        email: false,
        location: false,
        bio: false
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handdleToggle = this.handdleToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inputErrors: {...this.state.inputErrors, [name]:false}
    });
  }
  handdleToggle(event) {
    let isGuide = this.state.isGuide;
    this.setState({ isGuide: !isGuide }, () => console.log(this.state));
  }
  handleSubmit(event) {
    console.log('submit clicked');
    event.preventDefault();
    if (!this.state.name.length || !this.state.email.length || !this.state.location.length || !this.state.bio.length){
      this.setState({
        inputErrors: {
          name: !this.state.name,
          email: !this.state.email,
          location: !this.state.location,
          bio: !this.state.bio
        }
      });
    }
    else {
      fetch('/api/profile.php', {
        method: 'POST',
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(newUser => {
          console.log(newUser);
          this.setState({
            name: '',
            email: '',
            location: '',
            bio: '',
            isGuide: false
          });
        });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className = "signUp-title-container">
          <h1 className={classes.title}>Sign Up</h1>
        </div>
        <Grid mx="auto" container justify="center">
          <form onSubmit={this.handleSubmit} >
            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField error={this.state.inputErrors.name} required id="input-name" label="Name" value={this.state.name} name="name" onChange={this.handleInputChange} />

                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <Email />
                </Grid>
                <Grid item xs={10}>
                  <TextField error={this.state.inputErrors.email} required id="input-email" label="Email" value={this.state.email} name="email" onChange={this.handleInputChange} />
                </Grid>
              </Grid>
            </div>
            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <LocationOn />
                </Grid>
                <Grid item>
                  <TextField error={this.state.inputErrors.location} required id="input-location" label="location" value={this.state.location} name="location" onChange={this.handleInputChange} />
                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">

                <Grid item >
                  <TextField
                    error={this.state.inputErrors.bio} 
                    onChange = {this.handleInputChange}
                    id='outlined-textarea'
                    name = 'bio'
                    label='Tell us about yourself'
                    value={this.state.bio} 
                    multiline 
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                  />
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
