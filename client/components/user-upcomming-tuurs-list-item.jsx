import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinesEllipsis from 'react-lines-ellipsis';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(1)
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    margin: theme.spacing(2),
    height: 300
  },
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  media: {
    height: 200
  },
  font: {
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    marginRight: theme.spacing(1)
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
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={1.5} cellHeight={300}>

          <GridListTile className={classes.font}>
            <img className={classes.media} src="https://cdn.pixabay.com/photo/2016/02/18/20/02/seljalandsfoss-1207956_1280.jpg" alt="image" />
            <LinesEllipsis
              text = "it is an amazing spot for chilling on the grass with coffee and a book.it is an amazing spot for chilling on the grass with coffe A few very interesting stores could be found there as well. Check it out!it is an amazing spot for chilling on the grass with coffee and a book. A few very interesting stores could be found there as well. Check it out!"
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </GridListTile>

          <GridListTile className={classes.font}>
            <img className={classes.media} src="https://cdn.pixabay.com/photo/2016/02/18/20/02/seljalandsfoss-1207956_1280.jpg" alt="image" />
            <LinesEllipsis
              text = "chilling on the grass with coffee and a book. A few very interesting stores could be found coffee and a book. A few very interesting stores there as well.  Check it out! Check it out!it is an amazing spot for chilling on the grass with coffee and a book. A few very interesting stores could be found there as well. Check it out!"
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </GridListTile>

          <GridListTile className={classes.font}>
            <img className={classes.media} src="https://cdn.pixabay.com/photo/2016/02/18/20/02/seljalandsfoss-1207956_1280.jpg" alt="image" />
            <LinesEllipsis
              text = "A few very interesting stores could be found there as well. Check it out!  Check it out! it is an amazing spot for chilling on the grass with coffee and a book. A few very interesting stores could be found there as well. Check it out!"
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </GridListTile>

        </GridList>
      </div>
      </>
    );
  }
}

export default withStyles(styles)(UpCommingTuurItem);
