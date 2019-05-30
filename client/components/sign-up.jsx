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
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '100%'
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
            <form style={{width: 100 + '%'}} onSubmit={this.handleSubmit} >
              <div className={classes.margin}>
                <Grid container alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField required id="input-name" label="Name" name="name" onChange={this.handleChange} />
                  </Grid>
                </Grid>
                <TextField
                  id='outlined-textarea'
                  label='Tell us about yourself'
                  multiline
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                />
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
