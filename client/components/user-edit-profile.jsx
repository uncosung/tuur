import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import LocationOn from '@material-ui/icons/LocationOn';

const styles = theme => ({
  margin: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '100%'
  },
  marginTop: {
    marginTop: theme.spacing(2)
  },
  marginTop2: {
    marginTop: theme.spacing(5)
  },
  avatar: {
    width: 80,
    height: 80
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  marginLeft: {
    marginLeft: theme.spacing(0.5)
  }
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      location: '',
      image: '',
      bio: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inputErrors: { ...this.state.inputErrors, [name]: false }
    });
  }

  handleSubmit() {
    const { name, email, location, bio, image } = this.state;
    if (!this.state.name.length || !this.state.email.length || !this.state.location.length || !this.state.bio.length) {
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
      const { name, email, location, bio, image } = this.state;
      fetch(`api/profile.php?email=${email}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          email: email,
          location: location,
          image: image,
          bio: bio
        })
      })
        .then(res=>res.json())
        .then(updated => {
          console.log('updated')
        })

    }
  }
  componentDidMount() {
    const email = 'dPaschal@gmail.com';
    fetch(`api/profile.php?email=${email}`)
      .then(res => res.json())
      .then(response => this.setState({
        name: response.name,
        email: response.email,
        location: response.location,
        image: response.image,
        bio: response.bio
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
                <Grid item >
                  <Avatar alt="avatar" src={this.state.image} className={classes.avatar} />
                </Grid>
              </Grid>
            </Container>
            <Container>
              <Grid mx="auto" container component="form" justify="center" onSubmit={this.handleSubmit}>

                <Grid className={classes.margin} container alignItems="flex-end">
                  <Grid item xs={2}>
                    <AccountCircle fontSize='inherit' />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField required fullWidth id="input-name" label="Name" name="name" value={this.state.name} onChange={this.handleInputChange} />
                  </Grid>
                </Grid>
                <Grid className={classes.margin} container alignItems="flex-end">
                  <Grid item xs={2}>
                    <Email fontSize='inherit' />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField required fullWidth id="input-email" label="Email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                  </Grid>
                </Grid>

                <Grid className={classes.margin} container alignItems="flex-end">
                  <Grid item xs={2}>
                    <LocationOn fontSize='inherit'/>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField required fullWidth id="input-location" label="location" name="location" value={this.state.location} onChange={this.handleInputChange} />
                  </Grid>
                </Grid>

                <Grid className={classes.margin} container alignItems="flex-end">
                  <Grid item xs={12}>
                    <TextField required fullWidth id="input-imageUrl" label="Upload your image(URL)" name="image" value={this.state.image} onChange={this.handleInputChange} />
                  </Grid>
                </Grid>

                <Grid className={classes.margin} container alignItems="flex-end">
                  <Grid item xs={12}>
                    <TextField
                      id='outlined-textarea'
                      label='Tell us about yourself'
                      required
                      value={this.state.bio}
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

                <Grid className={classes.marginTop2} container justify="center" >
                  <Button type="submit" className={classes.margin} fullWidth variant="contained" color="primary" onClick={() => this.props.view('userProfile')}>
                    <Typography variant="body1" gutterBottom>Submit</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Container>
            </>
    );
  }
}

export default withStyles(styles)(EditProfile);
