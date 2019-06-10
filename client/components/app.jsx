import React, { Component } from 'react';
import UserProfile from './user-profile';
import { Route, Switch, withRouter } from 'react-router-dom';
import BottomNav from './bottom-nav';
import LogIn from './log-in';
import Itinerary from './itinerary';
import Results from './results';
import Search from './search';
import PackageDetails from './results/package-details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: {},
      location: [],
      tags: []
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
    this.setState({
      view: name,
      location: {
        name: location.name,
        coordinates: location.coordinates,
        toggleStatus: !location.toggleStatus
      }
    });

  }

  handleSearch(location, tags) {
    console.log('searched', location, tags);
    if (!location.name && tags) {
      console.log('location not set');
      this.setState({
        tags: tags
      }, () => console.log('location not set state', this.state))
      return
    }
    else if (!location.name && !tags){
      return
    }
    this.setState({
      location: location,
      tags: tags
    });

  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login"
            render={props => <LogIn {...props} isAuthed={true}/>}/>

          <Route exact path="/" render={props =>
            <div>
              <Search search={this.setView} />,
              <BottomNav />
            </div>
          }/>
          <Route exact path="/itinerary" render={props =>
            <div>
              <Itinerary />,
              <BottomNav />
            </div>
          }/>
          <Route exact path="/user-profile/:email"
            render={props => <div><UserProfile {...props} isAuthed={true}/>, <BottomNav /></div>}/>
          <Route exact path="/user-profile"
            render={props => <div><UserProfile {...props} isAuthed={true}/>, <BottomNav /></div>}/>
          
          <Route path="/results" render={props =>
            <div>
              <Results key={this.state.location.name} tags={this.state.tags} location={this.state.location} search={this.handleSearch}/>
              <BottomNav />
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
