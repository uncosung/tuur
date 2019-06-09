
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchResultGuideItem from '../search-result-guide-list-item';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  cardContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    padding: 10,
    width: '40rem'
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
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
    margin: theme.spacing(3),
    height: 180
  }
});

class SearchResultGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guideProfile: []
    };
  }
  componentDidMount() {
    // fetch('/api/search.php')
    //   .then(res => res.json())
    //   .then(search => this.setState({ guideProfile: search }));
  }

  render() {
    const { classes } = this.props;
    const profile = this.state.guideProfile.map(profile => {
      return <SearchResultGuideItem profile={profile} key={profile.id} />;
    });
    return (

      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h5">
          Meet the Tuur Guides
          </Typography>
        </Container>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
            {profile}
          </GridList>
        </div>
      </>
    );
  }

}

export default withStyles(styles)(SearchResultGuide);
