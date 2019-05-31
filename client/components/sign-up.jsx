import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  padding: {
    padding: theme.spacing(1)
  },
  paddingBottom: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '100%'
  },
  marginTop: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
  avatar: {
    width: 60,
    height: 60
  },
  marginTop2: {
    marginTop: theme.spacing(2)
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
      image: '',
      isGuide: false,
      inputErrors: {
        name: false,
        email: false,
        location: false,
        image: false,
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
    const { name, email, location, bio, image, isGuide } = this.state
    event.preventDefault();
    if (!this.state.name.length || !this.state.email.length || !this.state.location.length || !this.state.bio.length){
      this.setState({
        inputErrors: {
          name: !this.state.name,
          email: !this.state.email,
          location: !this.state.location,
          bio: !this.state.bio,
          image: !this.state.image
        }
      });
    }
    else {
      fetch('/api/profile.php', {
        method: 'POST',
        body: JSON.stringify({name, email, location, bio, image, isGuide})
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
      <Container>
        <Typography className={classes.marginTop} variant="h4" align="center" gutterBottom>
        Sign up
        </Typography>
        <Grid mx="auto" container component="form" justify="center" onSubmit={this.handleSubmit}>


          <Grid className={classes.margin} container alignItems="flex-end">
            <Grid item xs={2}>
              <AccountCircle fontSize='inherit' className={classes.paddingBottom}/>
            </Grid>
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.name ? 'Empty Field!' : ' '} error={this.state.inputErrors.name} fullWidth id="input-name" label="Name" name="name" onChange={this.handleInputChange} />
            </Grid>
          </Grid>
          <Grid className={classes.margin} container alignItems="flex-end">
            <Grid item xs={2}>
              <Email fontSize='inherit' className={classes.paddingBottom}/>
            </Grid>
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.email ? 'Empty Field!' : ' '} error={this.state.inputErrors.email} fullWidth id="input-email" label="Email" name="email" onChange={this.handleInputChange} />
            </Grid>
          </Grid>


          <Grid className={classes.margin} container alignItems="flex-end">
            <Grid item xs={2}>
              <LocationOn fontSize='inherit' className={classes.paddingBottom}/>
            </Grid>
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.location ? 'Empty Field!' : ' '} error={this.state.inputErrors.location} fullWidth id="input-location" label="Location" name="location" onChange={this.handleInputChange} />
            </Grid>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end">
            <Grid item xs={3}>
              <Avatar alt="avatar" src={this.state.image ? this.state.image : 'https://www.pngfind.com/pngs/m/481-4816267_default-icon-shadow-of-man-head-hd-png.png'} className={classes.avatar}/>
            </Grid>
            <Grid item xs={9}>
              <TextField required helperText={this.state.inputErrors.image ? 'Empty Field!' : ' '} error={this.state.inputErrors.image}  fullWidth id="input-imageUrl" label="Upload your image(URL)" name="image" onChange={this.handleInputChange} />
            </Grid>
          </Grid>
          <Grid className={classes.margin} container alignItems="flex-end">
            <Grid item xs={12}>
              <TextField
                id='outlined-textarea'
                label='Tell us about yourself'
                required
                helperText={this.state.inputErrors.bio ? 'Empty Field!' : ' '} 
                error={this.state.inputErrors.bio} 
                multiline
                fullWidth
                rowsMax={3}
                className={classes.textField}
                margin='normal'
                name="bio"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>


          <Grid justify="center" className={classes.margin} container>
            <FormControlLabel control={
              <Switch checked={this.state.isGuide} onChange={() => this.handdleToggle(event)} value="guide" />} label="Do you want to be a guide?" />
            <Grid className={classes.marginTop} container justify="center" >
              <Button type="submit" className={classes.margin} fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>
                <Typography variant="body1" gutterBottom>sign up</Typography>
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
