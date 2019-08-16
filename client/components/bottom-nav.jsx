import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import CardTravel from '@material-ui/icons/CardTravel';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import { faAutoprefixer } from '@fortawesome/free-brands-svg-icons';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '7px 0',
    zIndex: '100',
    left: '0'
    // [theme.breakpoints.only('md')]: {
    //   maxWidth: '500px'
    // },
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let path = null;
    if (!this.props.user) {
      path = '/login';
    } else {
      path = '/user-profile/' + this.props.user.email;
    }
    switch (event.currentTarget.id) {
      case 'home':
        this.props.path('/');
        break;
      case 'itinerary':
        this.props.path('/itinerary');
        break;
      case 'account':
        this.props.path(path);
        break;
    }
  }

  componentDidMount() {
    this.setState({ auth: this.props.auth });
  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <BottomNavigation
          onChange={this.handleChange}
          showLabels
          className={classes.root}

        >
          <BottomNavigationAction id={'home'} onClick={this.handleClick} label="Home" icon={<Home />} />
          <BottomNavigationAction id={'itinerary'} onClick={this.handleClick} label="Itinerary" icon={<CardTravel />} auth={this.state.auth} />
          <BottomNavigationAction id={'account'} onClick={this.handleClick} label="Account" icon={<AccountCircle />}/>
        </BottomNavigation>
      </ThemeProvider>
    );
  }

}

export default withStyles(styles)(BottomNav);
