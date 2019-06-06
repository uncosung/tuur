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
  },
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
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
    const packages = packageItem.map( ( item, id ) => {
      return <SearchPackageItem key={id} item={ item }/>
    })
    return packages;
  }


  render() {
    console.log( this );
    console.log( 'state', this.state.packages )
    const { classes } = this.props;
    return (
      { this.state.packages ? this.renderPackage : null}
      // { this.renderPackage() }
      // <SearchPackageItem />
      // { this.state.packages }
            // <>
            // <Container className={classes.marginBottom} >
            //   <Typography className={classes.marginTop} variant="h5">
            //         Tuurs
            //   </Typography>
            // </Container>
            // <Card className={classes.card}>
            //   <CardHeader
            //     title="Space Needle"
            //     subheader="September 14, 2016"
            //   />
            //   <CardMedia
            //     className={classes.media}
            //     image="https://bonneville.com/wp-content/uploads/2015/08/seattle-skyline-1024x516.png"
            //     title="Space Needle"
            //   />
            //   <CardContent>
            //     <Typography variant="body2" color="textSecondary" component="p">
            //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida nulla et enim convallis, non suscipit ligula rhoncus. Curabitur consequat magna vel velit tincidunt, eu imperdiet lectus pretium.
            //     </Typography>
            //   </CardContent>
            //   <CardActions disableSpacing>
            //     <IconButton aria-label="Add to favorites">
            //       <FavoriteIcon />
            //     </IconButton>
            //     <IconButton aria-label="Share">
            //       <ShareIcon />
            //     </IconButton>
            //   </CardActions>
            // </Card>
            // </>
    );
  }

}

export default withStyles(styles)(SearchPackages);
