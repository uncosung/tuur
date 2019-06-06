import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Clear from '@material-ui/icons/Clear';

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
    maxWidth: 400
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
  }
});

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  render() {
    const { classes } = this.props;
    return (
            <>
            <Container className={classes.marginBottom} >
              <Typography className={classes.marginTop} variant="h4">
                    Booked Tuurs
              </Typography>
            </Container>
            <Card className={classes.card}>
              <CardHeader
                title="Seattle Tuur"
                // subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image="https://bonneville.com/wp-content/uploads/2015/08/seattle-skyline-1024x516.png"
                title="Space Needle"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida nulla et enim convallis, non suscipit ligula rhoncus. Curabitur consequat magna vel velit tincidunt, eu imperdiet lectus pretium.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Trip:</Typography>
                  <Typography paragraph>
                  Cras et ante bibendum, vehicula elit nec, commodo lectus.
                  </Typography>
                  <Typography paragraph>
                  Donec in mi sit amet libero vulputate commodo. Morbi porttitor varius sapien, ut viverra risus faucibus vitae. Ut mattis mauris et justo luctus auctor. Nulla tempor quis nisl id pulvinar.
                  </Typography>
                  <Typography paragraph>
                  Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer ipsum odio, porta quis nibh quis, cursus iaculis orci. Phasellus ut commodo est. Pellentesque faucibus accumsan gravida. Fusce molestie sagittis aliquet.
                  </Typography>
                  <Typography>
                  Proin vel sapien tincidunt, faucibus tortor et, pulvinar ante.
                  </Typography>
                </CardContent>
                <Grid justify="center" container>
                  <Grid container justify="center" >
                    <ThemeProvider theme={theme}>
                      <Button type="submit" fullWidth variant="contained" color="primary" onClick={() => this.props.view('createPackage', this.props.user)}>
                        <Typography variant="body1" gutterBottom>Book</Typography>
                      </Button>
                    </ThemeProvider>
                  </Grid>
                </Grid>
              </Collapse>
            </Card>
            </>
    );
  }

}

export default withStyles(styles)(Itinerary);
