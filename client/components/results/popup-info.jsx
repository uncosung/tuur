import React, { PureComponent } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

class CityInfo extends PureComponent {

  render() {
    const { info } = this.props;
    const displayName = info.title;
    const displayLocation = info.location;

    return (  
      <div style={{ width: '240px', fontFamily: 'Roboto' }} onClick={() => {
        this.props.history.push({
          pathname: '/package-details/ '+info.id,
          state: {
            item: info
          }
        })
      }} 
      style={{ width: '240px', fontFamily: 'Roboto' }}
      >
        <div style={{ fontSize: '20px', textAlign: 'center' }}>
         <img style={{ width: '100%' }} src={info.mainImage} />
         <div>
          {displayName}
         </div>
         <div style={{ fontSize: '15px', textAlign: 'center' }}>
          {displayLocation}
         </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CityInfo)
