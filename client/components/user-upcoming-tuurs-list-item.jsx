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
    height: 310
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

class UpComingTuurItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.package);
    const { classes } = this.props;
    return (
      <>
          <GridListTile className={classes.font}>
            <img className={classes.media} src={this.props.package.mainImage} alt="image" />
            <LinesEllipsis
              text = {this.props.package.description}
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </GridListTile>
      </>
    );
  }
}

export default withStyles(styles)(UpComingTuurItem);
