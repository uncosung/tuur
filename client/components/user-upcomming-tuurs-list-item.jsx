import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  cardContainer: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    overflowX: 'auto'
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  card: {
    width: 300,
    height: 400
  },
  content: {
    height: 220
  },
  media: {
    height: 250
  }
});

class UpCommingTuurItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid className={classes.cardContainer} container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
          style={{ overflowX: 'auto', fontSize: '14px' }}>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} component="img" image="https://cdn.pixabay.com/photo/2016/02/18/20/02/seljalandsfoss-1207956_1280.jpg" alt="image" />
              <CardContent className={classes.content}>
                <Typography variant="body1">it is an amazing spot for chilling on the grass with coffee and a book. A few very interesting stores could be found there as well. Check it out!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} component="img" image="https://cdn.pixabay.com/photo/2016/02/18/20/02/seljalandsfoss-1207956_1280.jpg" alt="image" />
              <CardContent className={classes.content}>
                <Typography variant="body1">it is an amazing spot for chilling on the grass with coffee and a book. A few very interesting stores could be found there as well. Check it out!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(UpCommingTuurItem);
