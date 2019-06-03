import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BottomNav from './bottom-nav';
import DatePicker from './daterangepicker';
import UpComingTuursList from './user-upcoming-tuurs-list';
import CreatePackage from './createPackage';
import EditPackage from './editPackage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'signUp'
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name) {
    const view = { name };
    this.setState({ view });
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={CreatePackage} />
          <BottomNav />
        </div>
      </Router>

    // <div>
    //   {this.state.view.name === 'userProfile'
    //     ? <div>
    //       <UserProfile view={this.setView}/>
    //       <BottomNav />
    //     </div>
    //     : null
    //   }
    //   {this.state.view.name === 'signUp'
    //     ? <SignUp view={this.setView}/>
    //     : null
    //   }
    //   {this.state.view.name === 'editProfile'
    //     ? <div>
    //       <EditProfile view={this.setView} />
    //       <BottomNav />
    //     </div>
    //     : null
    //   }
    //   {this.state.view.name === 'createPackage'
    //     ? <div>
    //       <CreatePackage view={this.setView} />
    //       <BottomNav />
    //     </div>
    //     : null
    //   }
    //   {this.state.view.name === 'editPackage'
    //     ? <div>
    //       <EditPackage view={this.setView} />
    //       <BottomNav />
    //     </div>
    //     : null
    //   }

    // {/* <CreatePackage /> */}
    // {/* <EditPackage /> */}
    // {/* <EditProfile/> */}
    // {/* <UserProfile/> */}
    // {/* <SignUp /> */}
    // {/* <UpComingTuursList /> */}
    // {/* <DatePicker/> */}
    // {/* <BottomNav /> */}

    // </div>
    );
  }
}

export default App;
