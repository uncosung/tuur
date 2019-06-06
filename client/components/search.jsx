import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import MatGeocoder from 'react-mui-mapbox-geocoder';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  card: {
    maxWidth: 370
  },
  media: {
    height: 250
  },
  marginTop: {
    marginTop: theme.spacing(8)
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        name: '',
        coordinates: []
      }
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  handleSelect(result) {
    this.setState ({
      location: {
        name: result.place_name,
        coordinates: result.geometry.coordinates
      }
    }, () =>     console.log(this.state.location))
  }

  render() {
    const { classes } = this.props;
    const geocoderApiOptions = {
      country: 'us',
      proximity: { longitude: -118.243683, latitude: 34.052235 }
    };

    return (
    <>
     <Card mt={0}className={classes.card}>
       <CardActionArea>
         <CardMedia
           className={classes.media}
           component="img"
           image="https://chopra.com/sites/default/files/field/image/6reasonswhytravelingisgoodforyou.jpg"
           title="Travel Image"
         />
       </CardActionArea>
     </Card>

     {/* <Paper className={classes.root}>
      <InputBase className={classes.input} placeholder="Where do you want to go?" />
     </Paper> */}
      <Grid justify="center" className={classes.marginTop} container>
        <MatGeocoder
          inputPlaceholder="Where do you want to go?"
          accessToken={'pk.eyJ1IjoiamVub25nMTkiLCJhIjoiY2p2MzJoZHFoMDIxejQ0czNvYXF2azNnNSJ9.El0sFq0rePnWEbFC4RwVTQ'}
          showLoader={true}
          autocomplete={true}
          fuzzyMatch={true}
          {...geocoderApiOptions}
          onSelect={this.handleSelect}
        />
      </Grid>

     <Grid justify="center" container>
       <Grid className={classes.marginTop} container justify="center" >
         <ThemeProvider theme={theme}>
           <Button type="button" fullWidth variant="contained" color="primary" onClick={() => this.props.view('searchResult', null, this.state.location)}>
             <Typography variant="body1" gutterBottom>Search</Typography>
           </Button>
         </ThemeProvider>
       </Grid>
     </Grid>

    </>
    );
  }
}

export default withStyles(styles)(Search);
