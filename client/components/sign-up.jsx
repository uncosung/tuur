import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

class SignUp extends React.Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handdleToggle = this.handdleToggle.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handdleToggle(event) {
    let isGuide = this.state.isGuide;
    this.setState({ isGuide: !isGuide }, () => console.log(this.state));
  }
  handleSubmit(event) {
    console.log('submit clicked');
    event.preventDefault();
    fetch ('/api/profile.php', {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(newUser => {
        console.log(newUser)
        this.setState({
          name: '',
          email: '',
          location: '',
          bio: '',
          isGuide: false
        })
      })
  }
  componentDidMount() {

  }
  render() {
    const { classes } = this.props;
    return (
        <>
          <div className = "signUp-title-container">
            <h1 className="signUp-title">Sign up</h1>
          </div>
          <Grid mx="auto" container>
            <form onSubmit={this.handleSubmit} >

              <div className={classes.margin}>
                <Grid container alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField required id="input-name" label="Name" name="name" value = {this.state.name} onChange={this.handleChange} />
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
