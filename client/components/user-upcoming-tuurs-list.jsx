
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UpComingTuurItem from './user-upcoming-tuurs-list-item';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
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
  marginLeft: {
    marginLeft: theme.spacing(2)
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
    margin: theme.spacing(2),
    height: 310
  }
});

class UpComingTuursList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      packages: []
    }
  }

  componentDidMount(){
    fetch( '/api/package.php')
    .then( res => res.json())
    .then( packages => this.setState({ packages: packages }))
  }



  render(){
    console.log( this.state.packages)
    const { classes } = this.props;
    const packageMap = this.state.packages.map( packageItem => {
    return <UpComingTuurItem package={packageItem} key={packageItem.id} />})
    return (
      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h4">
            Upcoming Tuurs
          </Typography>
        </Container>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
            {packageMap}
          </GridList>
        </div>
      </>
  );
  }
  
}



export default withStyles(styles)(UpComingTuursList);
