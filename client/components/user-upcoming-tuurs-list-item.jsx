import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinesEllipsis from 'react-lines-ellipsis';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
    fontSize: '1.3rem',
    marginRight: theme.spacing(1)
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
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
          <GridListTile className={classes.font} key={this.props.package.mainImage}>
            <img className=""src={this.props.package.mainImage} alt={this.props.package.title} />
            <GridListTileBar
              title={this.props.package.title}
              classes={{
                root: classes.titleBar
              }}
            />
            {/* <LinesEllipsis
              text = {this.props.package.description}
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            /> */}
          </GridListTile>
      </>
    );
  }
}

export default withStyles(styles)(UpComingTuurItem);
