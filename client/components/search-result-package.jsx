import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import SearchPackageItem from './search-result-package-item';


const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
});

class SearchPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      packages: []
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  componentDidMount(){
    fetch( 'api/package.php?id=1' )
    .then( res => res.json() )
    .then( packages => {
      this.setState( { packages } )
    })
  }

  renderPackage(){
    const packages = this.state.packages.map( ( item, id ) => {
      return <SearchPackageItem key={id} item={ item }/>
    })
    return packages;
  }


  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h5">
            Tuurs
          </Typography>
        </Container>
        { this.state.packages ? this.renderPackage() : 'No available packages'}
      </>
      )
  }
}

export default withStyles(styles)(SearchPackages);




