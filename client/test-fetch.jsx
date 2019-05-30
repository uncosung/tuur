import React from 'react';

class Test extends React.Component {
    constructor(props) {
      super(props);
      this.postMethod = this.postMethod.bind(this);
    }
    render () {
      this.postMethod();
      return (
        <h1>Hello World</h1>
      )
    }
    postMethod () {
      fetch ('/api/profile.php', {
        method: 'POST',
        body: JSON.stringify({
          dummy: 'test'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then (res => res.json())
        .then (test => {
          console.log('post done');
        })
    }
    patchMethod () {
      user = 
      fetch (`/api/profile.php/${this.user.id}`)
    }
  }

  export default Test;