import React, { Component } from 'react';
import UserProfile from './user-profile';
import { Route, Switch, withRouter } from 'react-router-dom';
import BottomNav from './bottom-nav';
import LogIn from './log-in';
import Itinerary from './itinerary';
import Results from './results';
import Search from './search';
import PackageDetails from './results/package-details';
import UserViewProfile from './user-view-profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: null,
      location: []
    };
    this.setView = this.setView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.view !== prevState.view) {
      this.props.history.push(this.state.view);
    }
  }

  setView(name, user, location) {
    if(!location){
      this.setState({
        user
      })
      return
    }
    this.setState({
      view: name,
      user,
      location: {
        name: location.name,
        coordinates: location.coordinates,
        toggleStatus: !location.toggleStatus
      }
    });

  }

  handleSearch(prop) {
    debugger;
    console.log('searched');
    this.setState({
      location: prop
    });

  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login"
            render={props => <LogIn {...props} view={this.setView} isAuthed={true}/>}/>

          <Route exact path="/" render={props =>
            <div>
              <Search search={this.setView} />,
              <BottomNav user={this.state.user}/>
            </div>
          }/>
          <Route exact path="/itinerary" render={props =>
            <div>
              <Itinerary />,
              <BottomNav user={this.state.user}/>
            </div>
          }/>
          <Route exact path="/user-view-profile/:email"
            render={props => <div><UserViewProfile {...props} isAuthed={true}/>, <BottomNav user={this.state.user}/></div>}/>
          
          <Route exact path="/user-profile/:email"
            render={props => <div><UserProfile user={this.state.user} {...props} isAuthed={true}/>, 
            <BottomNav user={this.state.user} />
            </div>}
            /> 

          
          <Route path="/results" render={props =>
            <div>
              <Results location={this.state.location} search={this.handleSearch}/>
              <BottomNav user={this.state.user}/>
            </div>
          }/>
          <Route path="/package-details/:id"
            render={props => <PackageDetails packages={this.state.user}{...props} isAuthed={true}/>}/>

        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
