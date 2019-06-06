import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ThemeProvider } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
<<<<<<< HEAD
=======
import Modal from '@material-ui/core/Modal';
import DateRangePicker from './date-range-picker';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
>>>>>>> abeb62b3ee435546644edd623962aae9c19c12fc

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#A6C7C8' },
    inherit: { main: '#A0C3C5' },
    default: { main: 'white' }
  }
});

const styles = theme => ({
  grow: {
    flexGrow: 1,
    display: 'inline-block'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    },
    display: 'inline-block'
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    display: 'inline-block',
    paddingBottom: 8,
    paddingTop: 5,
    margin: 0,
    paddingLeft: 5
  },
  display: {
    display: 'inline-block',
    paddingBottom: 5,
    margin: 0,
    paddingLeft: 30
  },
<<<<<<< HEAD
  button: {
=======
  buttonDiv: {
    display: 'inline-block',
>>>>>>> abeb62b3ee435546644edd623962aae9c19c12fc
    marginLeft: 10,
    marginRight: 10
  },
  buttonContainer: {
    paddingLeft: 15
<<<<<<< HEAD
=======
  },
  paper: {
    position: 'absolute',
    width: 380,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  subtitle: {
    fontSize: 20
  },
  width: {
    width: 0,
    opacity: 0,
    position: 'absolute'
  },
  searchStyle: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 2
>>>>>>> abeb62b3ee435546644edd623962aae9c19c12fc
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.handdleToggle = this.handdleToggle.bind(this);
  }
  handdleToggle(event) {
    let newToggle = this.state.toggle;
    this.setState({ toggle: !newToggle }, () => {
      if (this.state.toggle){
        this.props.view('mapResults', null, this.props.location)
      }
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <>
         <ThemeProvider theme={theme}>
           <AppBar position="static" color="primary" className={classes.appBar}>
             <Grid container direction="row" className={classes.grow}>
               <Grid item xs={9} className={classes.appBar}>
                 <Toolbar>
                   <div className={classes.search}>
                     <Grid className={classes.searchIcon}>
                       <SearchIcon className={classes.searchStyle} />
                     </Grid>
                     <InputBase
                       placeholder="Search location "
                       classes={{
                         root: classes.inputRoot,
                         input: classes.inputInput
                       }}
                       inputProps={{ 'aria-label': 'Search' }}
                     />
                   </div>
                 </Toolbar>
               </Grid>

<<<<<<< HEAD
               <Grid item xs={3} className={classes.display}>
                 <FormControlLabel control={
                   <Switch checked={this.state.isGuide} onChange={() => this.handdleToggle(event)} />} label={this.state.toggle ? 'MAP' : 'LIST'} />
=======
               <Grid item xs={2} className={classes.appBar}>
                 <Button type="submit" variant="contained" color="default" style={{ fontSize: '1.1rem', padding: 3 }}>Go</Button>
>>>>>>> abeb62b3ee435546644edd623962aae9c19c12fc
               </Grid>
             </Grid>

             <Grid container className={classes.buttonContainer}>
               <Grid item xs={3} className={classes.button}>
                 <Button type="submit" fullWidth variant="contained" color="secondary">Dates</Button>
               </Grid>
               <Grid item xs={3}>
                 <Button type="submit" fullWidth variant="contained" color="secondary">Filter</Button>
               </Grid>

               <Grid item xs={3} className={classes.display}>
                 <FormControlLabel control={
                   <Switch checked={this.state.isGuide} onChange={() => this.handdleToggle(event)} />} label={this.state.toggle ? 'LIST' : 'MAP'} />
               </Grid>

             </Grid>

           </AppBar>
         </ThemeProvider>
      </>
    );
  }
}

export default withStyles(styles)(SearchBar);
