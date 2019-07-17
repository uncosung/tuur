import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';

const styles = theme => ({
  tile: {
    width: 200,
    height: '100%'
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

class SearchResultGuideItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <>
          <GridListTile className={classes.font} component={Link} style={{ textDecoration: 'none' }} to={'/user-view-profile/' + this.props.profile.id}>
            <img className={classes.tile} src={this.props.profile.image} alt={this.props.profile.name} />
            <GridListTileBar
              title={this.props.profile.name}
              subtitle={<span>{this.props.profile.bio}</span>}
              classes={{
                root: classes.titleBar
              }}
            />
          </GridListTile>
      </>
    );
  }
}

export default withStyles(styles)(SearchResultGuideItem);
