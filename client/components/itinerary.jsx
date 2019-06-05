import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
// import Clear from '@material-ui/icons/Clear';



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
                  Donec in mi sit amet libero vulputate commodo. Morbi porttitor varius sapien, ut viverra risus faucibus vitae. Ut mattis mauris et justo luctus auctor. Nulla tempor quis nisl id pulvinar. Proin id faucibus turpis. Proin ut condimentum justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis sollicitudin libero odio, sit amet aliquet est iaculis sed. Vivamus vel lacus ac lacus elementum hendrerit vitae eget tellus. Cras in placerat sem. In congue sagittis eros sit amet aliquet. Nunc sit amet ex ac magna malesuada accumsan.
                  </Typography>
                  <Typography paragraph>
                  Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer ipsum odio, porta quis nibh quis, cursus iaculis orci. Phasellus ut commodo est. Pellentesque faucibus accumsan gravida. Fusce molestie sagittis aliquet. Quisque posuere elementum leo et cursus. Nam blandit, nulla ac suscipit luctus, diam dui tempus quam, ut cursus ligula magna ultricies tellus. Nam massa velit, sagittis nec cursus at, euismod vitae sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed a blandit tellus. Integer quis tellus et magna volutpat placerat.
                  </Typography>
                  <Typography>
                  Proin vel sapien tincidunt, faucibus tortor et, pulvinar ante.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            </>
    );
  }

}

export default withStyles(styles)(Itinerary);
