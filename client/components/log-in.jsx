import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
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
      email: ''
    };
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inputErrors: { ...this.state.inputErrors, [name]: false }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log('clicked');
  }
  render() {
    const { classes } = this.props;
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
            <Button type="submit" className={classes.marginTop} onClick={this.handleSubmit} onChange={this.handleInputChange} fullWidth variant="contained" color="primary">
              <Typography variant="body1" gutterBottom>sign up</Typography>
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={8}>
          <Typography className={classes.marginTop} variant="button" gutterBottom>
            Don't have an account? </Typography>
        </Grid>
        <Grid item xs={3}>
          <ThemeProvider theme={theme}>
            <Typography className={classes.marginLeft} color="primary" variant="button" >sign up</Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
    );
  }
}

export default withStyles(styles)(LogIn);
