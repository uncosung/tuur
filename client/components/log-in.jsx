import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    inherit: { main: '#f1f1f1' },
    default: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
  marginLeft: {
    marginLeft: -5
  }
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      auth:false,
      user:null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/profile.php?email=${this.state.email}`)
      .then(res => res.json())
      .then(data => {
        if(data.auth){
          this.setState({
            auth:true,
            email:data.email,
            user:data
          }, ()=>this.props.view(null,this.state.user, null))
          
        }
      }
      )
  }
  render() {
    const { classes } = this.props;
    let path=null;
    if(this.state.auth){
        return <Redirect to={'/user-profile/' + this.state.email}/>
    }
    return (
    <>
      <Grid justify="center" alignItems="center" container>
        <Typography className={classes.marginTop} variant="h4" gutterBottom>
        Welcome back
        </Typography>
      </Grid>

      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={10}>
          <TextField onChange={this.handleInputChange} required fullWidth id="input-email" label="email" name="email" />
        </Grid>
      </Grid>

      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={8}>
          <ThemeProvider theme={theme}>
            <Button type="submit" className={classes.marginTop} onClick={ this.handleSubmit }  fullWidth variant="contained" color="primary">
              <Typography variant="body1" gutterBottom>log in</Typography>
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={7}>
          <Typography className={classes.marginTop} variant="button" gutterBottom align="center">
            Don't have an account? </Typography>
        </Grid>
        <Grid item xs={3}>
          <ThemeProvider theme={theme}>
            <Typography className={classes.marginLeft} color="primary" variant="button" align="center" onClick={() => this.props.view('signUp')}>sign up</Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
    );
  }
}

export default withStyles(styles)(LogIn);
