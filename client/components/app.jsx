import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import BottomNav from './bottom-nav';
import CreatePackage from './createPackage'

class App extends Component {
  render() {
    return (
      <div>
        {/* <EditProfile/> */}
        {/* <UserProfile/> */}
        {/* <SignUp /> */}
        {/* <BottomNav /> */}
        <CreatePackage />
      </div>
    );
  }
}

export default App;
