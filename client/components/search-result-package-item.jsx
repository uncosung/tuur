import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(0.5)
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
});

class SearchPackageItem extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.view('detail', this.props.item);
  }

  render() {
    const { classes } = this.props;
    // console.log( 'inside search package item ', this.props )
    return (
      <>
        <Card className={classes.card} onClick={ this.clickHandler } >	 
        {/* <Card className={classes.card} component={Link} to={'/package-details/' + this.props.item.id}> */}
          <CardHeader
            title={ this.props.item.title }
            // subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={ this.props.item.mainImage }
            title={ this.props.item.title }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              { this.props.item.description }
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </>
    );
  }
}
export default withStyles(styles)(SearchPackageItem);
