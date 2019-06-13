import React, { PureComponent } from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const { info } = this.props;
    const displayName = info.title;
    const displayLocation = info.location;

    return (
      <div style={{ width: '240px', fontFamily: 'Roboto' }}>
        <img style={{ width: '100%' }} src={info.mainImage} />
        <div style={{ fontSize: '20px', textAlign: 'center' }}>
          {displayName}
        </div>
        <div style={{ fontSize: '15px', textAlign: 'center' }}>
          {displayLocation}
        </div>
      </div>
    );
  }
}
