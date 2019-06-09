import React, {Component} from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

class CarouselImage extends Component {
  constructor( props ){
    this.super( props );
  }

  render(){
    console.log( 'carousel', this.props );
    const { classes } = this.props;

    return (
      <div style={divStyle} className={classes.productPreview} onClick={this.props.click }>
        <img id="0" style={imgStyle} src={this.state.images ? this.state.images[0] : null} alt={this.props.item.title}/>
      </div>
    )
  }
}

const divStyle = {
  width: '47px',
  height: '40px',
  border: '1px solid gray',
  marginRight: '5px',
  '&:hover': {
    opacity: 1
  }
};

const styles = theme => ({
  productPreview: {
    width: '50px',
    height: '50px',
    margin: '5px',
    opacity: 0.5,
    '&:hover': {
      opacity: 1
    }
  }
});

const imgStyle = {
  width: '100%',
  height: '100%',
  backgroundRepeat: 'norepeat',
  backgroundSize: '100% 100%',
  '&:hover': {
    opacity: 1
  }
};

export default withStyles(styles)(CarouselImage);


