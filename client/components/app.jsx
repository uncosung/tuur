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
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import CreatePackage from './createPackage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: null,
      location: [],
      tags: [],
      toggleStatus: false,
      dates: {
        start: null,
        end: null
      }
    };
    this.setView = this.setView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDates = this.handleDates.bind(this);
    this.logIn = this.logIn.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.view !== prevState.view) {
      this.props.history.push(this.state.view);
    }
  }

  setView(name, user, location) {
    if (!location) {
      this.setState({
        user
      });
      return;
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

  logIn(user) {
    this.setState({ user }, () => this.props.history.push('/user-profile/' + user.email));
  }

  edit(user) {
    this.setState({ user }, () => this.props.history.push('/user-profile/' + user.email));
  }

  handleSearch(location, tags) {
    if (!location.name && tags) {
      this.setState({
        tags: tags
      });

    } else if (!location.name && !tags) {

    } else {
      this.setState({
        location: location,
        tags: tags
      });
    }
  }
  handleDates(dates) {
    this.setState({
      dates: {
        start: dates.start,
        end: dates.end
      }
    }, () => console.log('these are the dates', this.state));
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login"
            render={props =>
              <div>
                <LogIn {...props} logIn={this.logIn} view={this.setView} isAuthed={true}/>
              </div>
            }/>

          <Route exact path="/" render={props =>
            <div>
              <Search search={this.setView} />
            </div>
          }/>
          <Route exact path="/itinerary" render={props =>
            <div>
              <Itinerary />
            </div>
          }/>
          <Route exact path="/sign-up" render={props =>
            <div>
              <SignUp logIn={this.logIn} search={this.setView}/>
            </div>
          }/>
          <Route exact path="/user-view-profile/:email"
            render={props => <div><UserViewProfile {...props} isAuthed={true}/>, <BottomNav user={this.state.user}/></div>}/>

          <Route exact path="/user-profile/:email"
            render={props => <div><UserProfile user={this.state.user} view={this.setView} {...props} isAuthed={true}/>,
            </div>}
          />

          <Route exact path="/edit-profile/:email"
            render={props => <div><EditProfile user={this.state.user} edit={this.edit} {...props} isAuthed={true}/>,
            </div>}
          />

          <Route path="/results" render={props =>
            <div>
              <Results dates={this.state.dates} handleDates={this.handleDates} toggleStatus={this.state.toggleStatus} key={this.state.location.name} tags={this.state.tags} location={this.state.location} search={this.handleSearch}/>
            </div>
          }/>
          <Route path="/package-details/:id"
            render={props => <PackageDetails packages={this.state.user}{...props} isAuthed={true}/>}/>

          <Route path="/create-package"
            render={props => <CreatePackage packages={this.state.user}{...props} isAuthed={true}/>}/>

        </Switch>
        <BottomNav user={this.state.user}/>
      </div>

    );
  }
}

export default withRouter(App);
