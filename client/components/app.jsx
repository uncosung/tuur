import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import BottomNav from './bottom-nav';
import DatePicker from './daterangepicker';
import UpComingTuursList from './user-upcoming-tuurs-list';

class App extends Component {
  render() {
    return (
      <div>

        {/* <EditProfile/> */}
        {/* <UserProfile/> */}
        {/* <SignUp /> */}
        {/* <UpComingTuursList /> */}
        <DatePicker/>
        {/* <BottomNav /> */}
      </div>
    );
  }
}

export default App;
