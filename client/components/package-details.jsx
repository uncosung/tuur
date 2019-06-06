import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocationOn from '@material-ui/icons/LocationOn';
import Alarm from '@material-ui/icons/Alarm';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

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
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20
  }
});

class PackageDetails extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind( this );
    this.bookHandler = this.bookHandler.bind( this );
  }

  clickHandler(){
    this.props.view( 'result', [] );
  }

  bookHandler(){

  }



  render() {
    const { classes } = this.props;
    console.log( this.props.item );
    return (
            <>
            <Card className={classes.card}>
              <Grid item xs={2} className={classes.paddingRight} name='back' onClick={ this.clickHandler }>
                <KeyboardArrowLeft className={classes.fontSize} />
              </Grid>
              <CardMedia
                className={classes.media}
                image={ this.props.item.mainImage }
                // title="Space Needle"
              />
              <CardHeader
                title={ this.props.item.title }
                // subheader="September 14, 2016"
              />
              <CardContent>
                <LocationOn /> { this.props.item.location }
              </CardContent>
              <CardContent>
                {/* <Alarm/> { timeRange } */}
              </CardContent>
              <CardContent>
                <Typography paragraph>Trip:</Typography>
                <Typography paragraph>
                  { this.props.item.description }
                </Typography>
              </CardContent>
              <Grid justify="center" container>
                <Grid container justify="center" >
                  <ThemeProvider theme={theme}>
                    <Button type="submit" fullWidth variant="contained" color="primary" >
                      <Typography variant="body1" gutterBottom>Book</Typography>
                    </Button>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </Card>
            </>
    );
  }

}

export default withStyles(styles)(PackageDetails);
