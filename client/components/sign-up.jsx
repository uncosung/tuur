import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  },
  spacing: 8,
  button: {
    margin: theme.spacing.unit,
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
      shortDescription: '',
      accout: 'tuurist'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
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
          <Grid mx="auto" container spacing={16}>
            <form onSubmit={this.handleSubmit} >

              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField required id="input-name" label="Name" name="name" onChange={this.handleChange} />
                  </Grid>
                </Grid>
              </div>

            </form>
          </Grid>
      </>
    );
  }
}

export default withStyles(styles)(SignUp);
