import React, { PureComponent } from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const { info } = this.props;
    const displayName = `${info.title}, ${info.location}`;

    return (
      <div style={{ width: '240px', fontFamily: 'Roboto' }}>
        <div>
          {displayName}
        </div>
        <img width={200} src={info.mainImage} />
      </div>
    );
  }
}
