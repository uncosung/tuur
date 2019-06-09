import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
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
      packages: [],
      view: {
        name: 'result',
        item: []
      }
    };
    this.setView = this.setView.bind(this);
  }

  // setView( name, item ){
  //   const view = { name, item };
  //   this.setState( { view } )

  setView(item) {
    const view = { item };
    this.setState({ view });
  }

  // componentDidMount(){
  //   fetch( '/api/package.php?id' )
  //   // fetch( 'api/package.php?id=1' )
  //   // fetch( 'api/package.php' )
  //   .then( res => res.json() )
  //   .then( packages => this.setState( { packages } ) )

  componentDidMount() {
    fetch('/api/package.php')
      .then(res => res.json())
      .then(packages => this.setState({ packages }));
  }

  renderPackage() {
    const packages = this.state.packages.map((item, id) => {
      return <SearchPackageItem key={id} item={ item } />;
    });
    return packages;
  }

  render() {
    const { classes } = this.props;
    // const { item, name } = this.state.view
    return (
      <>
          {/* <SearchResultGuide /> */}
          <Container className={classes.marginBottom} >
            <Typography className={classes.marginTop} variant="h5">
              Tuurs
            </Typography>
          </Container>
          { this.state.packages ? this.renderPackage() : 'No available packages'}
      </>
    );
  }
}

export default withStyles(styles)(SearchPackages);
