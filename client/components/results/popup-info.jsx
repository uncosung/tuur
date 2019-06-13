import React, { PureComponent } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

class CityInfo extends PureComponent {

  render() {
    const { info } = this.props;
    const displayName = `${info.title}, ${info.location}`;

    return (
      <div onClick={() => {
        this.props.history.push({
          pathname: '/package-details/ '+info.id,
          state: {
            item: info
          }
        })
      }} 
      style={{ width: '240px', fontFamily: 'Roboto' }}
      >
        <div>
          {displayName}
        </div>
        <img width={200} src={info.mainImage} />
      </div>
    );
  }
}

export default withRouter(CityInfo)
