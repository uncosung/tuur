import React, { Component } from 'react';
import SignUp from './sign-up';
import BottomNav from './bottom-nav';

class App extends Component {
  render() {
    return (
      <div>
        <SignUp />
        <BottomNav />
      </div>
    );
  }
}

export default App;
