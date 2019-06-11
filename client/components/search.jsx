import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import MatGeocoder from 'react-mui-mapbox-geocoder';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

const imgStyle = {
  width: '100%',
  height: '70px',
  backgroundRepeat: 'norepeat',
  backgroundSize: '100% 100%',
  '&:hover': {
    opacity: 1
  }
};

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
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleClick() {
    this.props.search('/results', null, this.state.location);
  }
  handleSelect(result) {
    this.setState({
      location: {
        name: result.place_name,
        coordinates: result.geometry.coordinates,
        toggleStatus: true
      }
    });
  }

  render() {
    const { classes } = this.props;
    const geocoderApiOptions = {
      country: 'us',
      proximity: { longitude: -118.243683, latitude: 34.052235 }
    };

    return (
      <div style={{ fontSize: 0 }}>
        <img style={imgStyle} src="https://i.imgur.com/AU3rU4N.png" alt="logo"/>
        <Card style={{ maxWidth: '100%' }} mt={0} className={classes.card}>
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
          <Grid item xs={10}>
            <MatGeocoder
              inputPlaceholder="Where do you want to go?"
              accessToken={'pk.eyJ1IjoiamVub25nMTkiLCJhIjoiY2p2MzJoZHFoMDIxejQ0czNvYXF2azNnNSJ9.El0sFq0rePnWEbFC4RwVTQ'}
              showLoader={true}
              showInputContainer={false}
              autocomplete={true}
              fuzzyMatch={true}
              {...geocoderApiOptions}
              onSelect={this.handleSelect}
            />
          </Grid>
        </Grid>

        <Grid justify="center" container>
          <Grid className={classes.marginTop} container justify="center" >
            <Grid item xs={10}>
              <ThemeProvider theme={theme}>
                <Button type="button" fullWidth variant="contained" color="primary" component='a' onClick={this.handleClick}>
                  <Typography variant="body1" gutterBottom>Search</Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}
export default withStyles(styles)(Search);
